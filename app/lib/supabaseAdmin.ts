import { createClient } from '@supabase/supabase-js';

export function supabaseAdmin() {
if (typeof window !== 'undefined') {
throw new Error('supabaseAdmin must only be used on the server');
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!url || !serviceRoleKey) {
throw new Error('Missing SUPABASE env vars');
}
return createClient(url, serviceRoleKey);
}