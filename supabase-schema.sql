-- SkillBridge Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('learner', 'instructor', 'company')),
  bio TEXT,
  location TEXT,
  hourly_rate DECIMAL(10,2),
  skills TEXT[],
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2),
  total_earnings DECIMAL(12,2) DEFAULT 0,
  success_rate DECIMAL(5,2)
);

-- Create skill_requests table
CREATE TABLE IF NOT EXISTS skill_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skill_category TEXT NOT NULL,
  skill_level TEXT NOT NULL CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
  budget_min DECIMAL(10,2) NOT NULL,
  budget_max DECIMAL(10,2) NOT NULL,
  duration_weeks INTEGER NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('online', 'in_person', 'hybrid')),
  location TEXT,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  selected_instructor_id UUID REFERENCES profiles(id),
  tags TEXT[]
);

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  skill_request_id UUID NOT NULL REFERENCES skill_requests(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  proposed_rate DECIMAL(10,2) NOT NULL,
  estimated_duration INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  attachments TEXT[]
);

-- Create messages table for communication
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  skill_request_id UUID NOT NULL REFERENCES skill_requests(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  skill_request_id UUID NOT NULL REFERENCES skill_requests(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  skills_improved TEXT[],
  income_generated DECIMAL(10,2)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for skill_requests
CREATE POLICY "Anyone can view open skill requests" ON skill_requests FOR SELECT USING (true);
CREATE POLICY "Learners can create skill requests" ON skill_requests FOR INSERT WITH CHECK (auth.uid() = learner_id);
CREATE POLICY "Learners can update own skill requests" ON skill_requests FOR UPDATE USING (auth.uid() = learner_id);

-- Create policies for proposals
CREATE POLICY "Anyone can view proposals" ON proposals FOR SELECT USING (true);
CREATE POLICY "Instructors can create proposals" ON proposals FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "Instructors can update own proposals" ON proposals FOR UPDATE USING (auth.uid() = instructor_id);

-- Create policies for messages
CREATE POLICY "Users can view their messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their messages" ON messages FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Create policies for reviews
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for completed requests" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skill_requests_status ON skill_requests(status);
CREATE INDEX IF NOT EXISTS idx_skill_requests_category ON skill_requests(skill_category);
CREATE INDEX IF NOT EXISTS idx_skill_requests_learner ON skill_requests(learner_id);
CREATE INDEX IF NOT EXISTS idx_proposals_request ON proposals(skill_request_id);
CREATE INDEX IF NOT EXISTS idx_proposals_instructor ON proposals(instructor_id);
CREATE INDEX IF NOT EXISTS idx_messages_skill_request ON messages(skill_request_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON reviews(reviewee_id);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, user_type, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'learner'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_skill_requests_updated_at ON skill_requests;
DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_requests_updated_at BEFORE UPDATE ON skill_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 