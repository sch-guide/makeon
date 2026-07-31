"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;
let accessTokenRequest: Promise<string | null> | null = null;

export function isSupabaseBrowserConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  browserClient ??= createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return browserClient;
}

async function resolveAnonymousAccessToken() {
  const client = getSupabaseBrowserClient();
  if (!client) return null;

  const { data: sessionData } = await client.auth.getSession();
  if (sessionData.session?.access_token) return sessionData.session.access_token;

  const { data, error } = await client.auth.signInAnonymously();
  if (error) throw error;
  return data.session?.access_token ?? null;
}

export async function getAnonymousAccessToken() {
  accessTokenRequest ??= resolveAnonymousAccessToken();
  try {
    return await accessTokenRequest;
  } finally {
    accessTokenRequest = null;
  }
}
