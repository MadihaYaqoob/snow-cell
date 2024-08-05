// src/flow/SupabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_API_ENDPOINT;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("Supabase client initialized:", supabase);

export default supabase;
