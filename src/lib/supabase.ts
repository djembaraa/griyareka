import { createClient } from '@supabase/supabase-js';

// These env vars are required if using real Supabase.
// In this mock setup, we provide fallbacks to prevent errors if not set.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
