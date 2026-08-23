import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Verifies the caller has a valid Supabase Auth session before an admin
// API route performs a write. Returns the Supabase client (cookie-scoped,
// so RLS "authenticated" policies apply) or a 401 response to return early.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      supabase: null,
      user: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { supabase, user, response: null };
}
