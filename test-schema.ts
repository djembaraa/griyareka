import { supabaseAdmin } from './src/lib/supabase-admin';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkSchema() {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').limit(1);
  console.log('Error:', error);
  console.log('Columns:', data && data.length > 0 ? Object.keys(data[0]) : (data ? 'Empty table' : 'No data'));
}

checkSchema();
