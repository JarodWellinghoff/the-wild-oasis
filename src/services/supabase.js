import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://idvvxuiojgkrbctlzbsw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdnZ4dWlvamdrcmJjdGx6YnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTMxNDgsImV4cCI6MjAyOTcyOTE0OH0.Aya1fvSzluLwJa5pD6p4ZkBIyvuo99w844EahJ7BICM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
