import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  console.log("Inviting user...");
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail('test@griyareka.id', {
    redirectTo: 'http://localhost:3000/auth/callback',
    data: { role: 'admin' }
  });
  console.log("Data:", JSON.stringify(data, null, 2));
  console.log("Error:", JSON.stringify(error, null, 2));
  if (error) {
    console.log("Error object type:", typeof error);
    console.log("Error message:", error.message);
  }
}

main().catch(console.error);
