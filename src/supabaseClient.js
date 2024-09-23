// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mqsylsighfzstnrpejoo.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xc3lsc2lnaGZ6c3RucnBlam9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyOTk1NzQsImV4cCI6MjA0MDg3NTU3NH0.nkG1RTEn_DOq_BMmo2rho32r023unxcPJiEuVHt4ikg'; // Replace with your Supabase Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
