import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The Project URL found in your Supabase Dashboard (Settings > API)
const DEFAULT_URL = 'https://humatmtwrwzsejygtpau.supabase.co';

// The Public 'anon' key provided by the user
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWF0bXR3cnd6c2VqeWd0cGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMzAxMTQsImV4cCI6MjA4MjkwNjExNH0.z47VAKpcGvoRfFndd_jIqnTppjfrnuvBZM6TqH7pzMI';

/**
 * Returns a Supabase client. 
 * Checks environment variables first, then local storage, then hardcoded fallback.
 */
export const getSupabaseClient = (manualKey?: string): SupabaseClient | null => {
  const url = process.env.SUPABASE_URL || DEFAULT_URL;
  
  // Priority: 1. Passed arg, 2. Env Var, 3. LocalStorage (previous manual entries), 4. Hardcoded Fallback
  const key = manualKey 
    || process.env.SUPABASE_ANON_KEY 
    || localStorage.getItem('SUPABASE_PUBLISHABLE_KEY')
    || DEFAULT_KEY;

  if (!url || !key) {
    console.error("Supabase configuration missing URL or Key.");
    return null;
  }

  try {
    // Create a new client instance every time to ensure we use the latest manual key if provided
    return createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } catch (e) {
    console.error("Failed to initialize Supabase client:", e);
    return null;
  }
};

// Default export for quick access
export const supabase = getSupabaseClient();
