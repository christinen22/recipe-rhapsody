import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabase = createClient<Database>(String(process.env.NEXT_PUBLIC_SUPABASE_URL), String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))

export default supabase;