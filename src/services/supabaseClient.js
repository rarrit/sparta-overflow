import { createClient } from "@supabase/supabase-js";

// 1) project url
const SUPABASE_PROJECT_URL = "https://olhriejiwmtmfljxonuq.supabase.co";

// 2) anon key
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saHJpZWppd210bWZsanhvbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NTg2MTIsImV4cCI6MjA0MDQzNDYxMn0.ijwmmUWU54bojAkT0grdHZy5xhHP8sjLMkdguaFd2eM";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
export default supabase;