import { createClient } from '@supabase/supabase-js';

// Use the Service Role Key for Admin operations (e.g., managing users)
// WARNING: This key bypasses RLS. Never expose this to the frontend.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-service-key';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
