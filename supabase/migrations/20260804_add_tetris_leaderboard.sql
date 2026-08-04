begin;

alter table public.makeon_game_scores
  drop constraint if exists makeon_game_scores_game_key_check;
alter table public.makeon_game_scores
  add constraint makeon_game_scores_game_key_check
  check (game_key in ('pastel_stack', 'pastel_color_sort', 'pastel_memory_match', 'tetris'));

alter table public.makeon_game_daily_scores
  drop constraint if exists makeon_game_daily_scores_game_key_check;
alter table public.makeon_game_daily_scores
  add constraint makeon_game_daily_scores_game_key_check
  check (game_key in ('pastel_stack', 'pastel_color_sort', 'pastel_memory_match', 'tetris'));

alter table public.makeon_game_sessions
  drop constraint if exists makeon_game_sessions_game_key_check;
alter table public.makeon_game_sessions
  add constraint makeon_game_sessions_game_key_check
  check (game_key in ('pastel_stack', 'pastel_color_sort', 'pastel_memory_match', 'tetris'));

create index if not exists makeon_game_scores_tetris_rank_idx
  on public.makeon_game_scores
  (game_key, leaderboard_key, score desc, height desc, level desc, duration_ms asc, achieved_at asc);

create or replace function public.makeon_is_better_tetris_score(
  p_score integer,
  p_lines integer,
  p_level integer,
  p_duration_ms integer,
  c_score integer,
  c_lines integer,
  c_level integer,
  c_duration_ms integer
) returns boolean
language sql
immutable
set search_path = public
as $$
  select case
    when p_score <> c_score then p_score > c_score
    when p_lines <> coalesce(c_lines, 0) then p_lines > coalesce(c_lines, 0)
    when p_level <> coalesce(c_level, 1) then p_level > coalesce(c_level, 1)
    else p_duration_ms < coalesce(c_duration_ms, 2147483647)
  end;
$$;

create or replace function public.makeon_submit_tetris_score(
  p_user_id uuid,
  p_game_session_id uuid,
  p_score integer,
  p_lines integer,
  p_level integer,
  p_duration_ms integer,
  p_difficulty text,
  p_submission_hash text,
  p_score_date date
) returns table (improved boolean, ignored boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session public.makeon_game_sessions%rowtype;
  v_current public.makeon_game_scores%rowtype;
  v_daily public.makeon_game_daily_scores%rowtype;
  v_improved boolean;
  v_daily_improved boolean;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':makeon:tetris', 0));

  if p_score_date <> (now() at time zone 'Asia/Seoul')::date then
    raise exception 'invalid_score_date';
  end if;

  select * into v_session
  from public.makeon_game_sessions
  where id = p_game_session_id and user_id = p_user_id
  for update;

  if not found or v_session.submitted_at is not null or v_session.game_key <> 'tetris'
     or v_session.difficulty is distinct from p_difficulty then
    raise exception 'invalid_or_consumed_session';
  end if;

  if now() - v_session.started_at < interval '1 second'
     or now() - v_session.started_at > interval '3 hours' then
    raise exception 'invalid_session_duration';
  end if;

  if exists (
    select 1 from public.makeon_game_score_submissions
    where user_id = p_user_id and game_key = 'tetris'
      and created_at > now() - interval '3 seconds'
  ) then
    raise exception 'rate_limit_short';
  end if;

  if (
    select count(*) from public.makeon_game_score_submissions
    where user_id = p_user_id and game_key = 'tetris'
      and created_at > now() - interval '1 minute'
  ) >= 12 then
    raise exception 'rate_limit_minute';
  end if;

  select * into v_current from public.makeon_game_scores
  where user_id = p_user_id and game_key = 'tetris' and leaderboard_key = 'overall'
  for update;

  if not found then
    v_improved := true;
  else
    v_improved := public.makeon_is_better_tetris_score(
      p_score, p_lines, p_level, p_duration_ms,
      v_current.score, v_current.height, v_current.level, v_current.duration_ms
    );
  end if;

  if v_improved then
    insert into public.makeon_game_scores (
      user_id, game_key, leaderboard_key, score, level, height,
      duration_ms, difficulty, achieved_at, updated_at
    ) values (
      p_user_id, 'tetris', 'overall', p_score, p_level, p_lines,
      p_duration_ms, p_difficulty, now(), now()
    )
    on conflict (user_id, game_key, leaderboard_key) do update set
      score = excluded.score,
      level = excluded.level,
      height = excluded.height,
      duration_ms = excluded.duration_ms,
      difficulty = excluded.difficulty,
      achieved_at = excluded.achieved_at,
      updated_at = excluded.updated_at;
  end if;

  select * into v_daily from public.makeon_game_daily_scores
  where user_id = p_user_id and game_key = 'tetris'
    and leaderboard_key = 'overall' and score_date = p_score_date
  for update;

  if not found then
    v_daily_improved := true;
  else
    v_daily_improved := public.makeon_is_better_tetris_score(
      p_score, p_lines, p_level, p_duration_ms,
      v_daily.score, v_daily.height, v_daily.level, v_daily.duration_ms
    );
  end if;

  if v_daily_improved then
    insert into public.makeon_game_daily_scores (
      user_id, game_key, leaderboard_key, score_date, score, level, height,
      duration_ms, difficulty, achieved_at, updated_at
    ) values (
      p_user_id, 'tetris', 'overall', p_score_date, p_score, p_level, p_lines,
      p_duration_ms, p_difficulty, now(), now()
    )
    on conflict (user_id, game_key, leaderboard_key, score_date) do update set
      score = excluded.score,
      level = excluded.level,
      height = excluded.height,
      duration_ms = excluded.duration_ms,
      difficulty = excluded.difficulty,
      achieved_at = excluded.achieved_at,
      updated_at = excluded.updated_at;
  end if;

  update public.makeon_game_sessions set submitted_at = now() where id = p_game_session_id;
  insert into public.makeon_game_score_submissions (
    user_id, game_key, game_session_id, submission_hash, accepted
  ) values (
    p_user_id, 'tetris', p_game_session_id, p_submission_hash, v_improved
  );

  return query select v_improved, not v_improved;
end;
$$;

create or replace function public.makeon_get_tetris_rankings(
  p_period text,
  p_user_id uuid,
  p_limit integer default 20
) returns table (
  rank bigint,
  nickname text,
  score integer,
  level integer,
  height integer,
  moves integer,
  duration_ms integer,
  best_combo integer,
  difficulty text,
  achieved_at timestamptz,
  is_current_user boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if p_period = 'today' then
    return query
      with ranked as (
        select row_number() over (
          order by s.score desc, s.height desc, s.level desc, s.duration_ms asc, s.achieved_at asc
        ) as position, p.nickname, s.user_id, s.score, s.level, s.height, s.moves,
          s.duration_ms, s.best_combo, s.difficulty, s.achieved_at
        from public.makeon_game_daily_scores s
        join public.makeon_game_profiles p on p.user_id = s.user_id
        where s.game_key = 'tetris' and s.leaderboard_key = 'overall'
          and s.score_date = (now() at time zone 'Asia/Seoul')::date
      )
      select r.position, r.nickname, r.score, r.level, r.height, r.moves,
        r.duration_ms, r.best_combo, r.difficulty, r.achieved_at,
        r.user_id = p_user_id
      from ranked r
      where r.position <= greatest(1, least(p_limit, 20)) or r.user_id = p_user_id
      order by r.position;
  elsif p_period = 'all' then
    return query
      with ranked as (
        select row_number() over (
          order by s.score desc, s.height desc, s.level desc, s.duration_ms asc, s.achieved_at asc
        ) as position, p.nickname, s.user_id, s.score, s.level, s.height, s.moves,
          s.duration_ms, s.best_combo, s.difficulty, s.achieved_at
        from public.makeon_game_scores s
        join public.makeon_game_profiles p on p.user_id = s.user_id
        where s.game_key = 'tetris' and s.leaderboard_key = 'overall'
      )
      select r.position, r.nickname, r.score, r.level, r.height, r.moves,
        r.duration_ms, r.best_combo, r.difficulty, r.achieved_at,
        r.user_id = p_user_id
      from ranked r
      where r.position <= greatest(1, least(p_limit, 20)) or r.user_id = p_user_id
      order by r.position;
  else
    raise exception 'invalid_ranking_period';
  end if;
end;
$$;

revoke all on function public.makeon_is_better_tetris_score(integer, integer, integer, integer, integer, integer, integer, integer) from public, anon, authenticated;
revoke all on function public.makeon_submit_tetris_score(uuid, uuid, integer, integer, integer, integer, text, text, date) from public, anon, authenticated;
revoke all on function public.makeon_get_tetris_rankings(text, uuid, integer) from public, anon, authenticated;
grant execute on function public.makeon_submit_tetris_score(uuid, uuid, integer, integer, integer, integer, text, text, date) to service_role;
grant execute on function public.makeon_get_tetris_rankings(text, uuid, integer) to service_role;

commit;
