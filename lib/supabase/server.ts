import "server-only";

import { createClient, type User } from "@supabase/supabase-js";

function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && publishableKey ? { url, publishableKey } : null;
}

export function isSupabaseServerConfigured() {
  return Boolean(publicConfig() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseAdmin() {
  const config = publicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!config || !serviceRoleKey) return null;
  return createClient(config.url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export async function authenticateGameRequest(request: Request): Promise<User | null> {
  const config = publicConfig();
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!config || !token) return null;

  const authClient = createClient(config.url, config.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data.user?.is_anonymous) return null;
  return data.user;
}

