'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  user_id: string;
  user_type: 'parent' | 'student' | 'tutor';
  full_name: string;
  email: string;
  phone?: string;
  location_subcity?: string;
  location_kebele?: string;
  location_details?: string;
  bio?: string;
  subjects?: string[];
  grade_levels?: string[];
  session_types?: string[];
  education_level?: string;
  university?: string;
  major?: string;
  years_experience?: number;
  teaching_certificates?: string[];
  verification_status?: string;
  verified_at?: string;
  hourly_rate?: number;
  rating?: number;
  total_sessions?: number;
  total_earnings?: number;
  response_time_hours?: number;
  available_days?: string[];
  available_times?: Record<string, string[]>;
  children_count?: number;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    userType: 'parent' | 'student' | 'tutor',
    fullName: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SUPABASE_SETUP_ERROR = `🔧 Supabase Setup Required!

To use Eagle Tutorials, you need to set up your Supabase project:

1. Create a free Supabase project at https://supabase.com
2. Get your project URL and API key from the dashboard
3. Create a '.env.local' file in your project root with:

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

4. Run the database schema from 'supabase-schema.sql'
5. Restart your development server

Need help? Check the SUPABASE_SETUP.md for detailed setup instructions.`;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase is not configured, stop loading
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }: { data: { session: Session | null } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(
            session.user.id,
            session.user.email,
            session.user.user_metadata
          );
        } else {
          setLoading(false);
        }
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(
            session.user.id,
            session.user.email,
            session.user.user_metadata
          );
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (
    userId: string,
    email?: string,
    metadata?: Record<string, unknown>
  ) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist, try to create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile...');
          await createProfile(userId, email, metadata);
          return;
        }
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (
    userId: string,
    email?: string,
    metadata?: Record<string, unknown>
  ) => {
    try {
      const profileData = {
        id: userId,
        email: email || '',
        user_type:
          (metadata?.user_type as 'parent' | 'student' | 'tutor') || 'parent',
        full_name: metadata?.full_name || '',
        verification_status: 'pending',
        rating: 0,
        total_sessions: 0,
        total_earnings: 0,
        response_time_hours: 24,
        available_days: [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ],
        children_count: 0,
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        setProfile(null);
      } else {
        console.log('Profile created successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      setProfile(null);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userType: 'parent' | 'student' | 'tutor',
    fullName: string
  ) => {
    if (!isSupabaseConfigured) {
      return { user: null, error: SUPABASE_SETUP_ERROR };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        return { user: data.user, error: null };
      }

      return { user: null, error: 'Unknown error occurred' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      if (
        errorMessage.includes('fetch') ||
        errorMessage.includes('Failed to fetch')
      ) {
        return { user: null, error: SUPABASE_SETUP_ERROR };
      }

      return { user: null, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { user: null, error: SUPABASE_SETUP_ERROR };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data.user, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      if (
        errorMessage.includes('fetch') ||
        errorMessage.includes('Failed to fetch')
      ) {
        return { user: null, error: SUPABASE_SETUP_ERROR };
      }

      return { user: null, error: errorMessage };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !isSupabaseConfigured) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
