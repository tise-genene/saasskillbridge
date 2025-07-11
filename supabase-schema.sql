-- Eagle Tutorials Services Database Schema
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
  user_type TEXT NOT NULL CHECK (user_type IN ('parent', 'student', 'tutor')),
  bio TEXT,
  phone_number TEXT,
  
  -- Location fields for Addis Ababa
  location_subcity TEXT, -- e.g., Bole, Kirkos, Yeka, etc.
  location_kebele TEXT,
  location_details TEXT, -- Specific address or landmarks
  
  -- Tutor-specific fields
  hourly_rate DECIMAL(10,2),
  subjects TEXT[], -- e.g., ['Mathematics', 'Physics', 'Chemistry']
  grade_levels TEXT[], -- e.g., ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
  session_types TEXT[] DEFAULT ARRAY['online', 'home'], -- 'online' or 'home'
  education_level TEXT, -- e.g., 'Bachelor', 'Master', 'PhD'
  university TEXT,
  major TEXT,
  years_experience INTEGER DEFAULT 0,
  teaching_certificates TEXT[], -- Array of certificate names/paths
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Profile stats
  rating DECIMAL(3,2) DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  response_time_hours INTEGER DEFAULT 24, -- Average response time in hours
  
  -- Availability
  available_days TEXT[] DEFAULT ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  available_times JSONB, -- Store time slots per day
  
  -- Parent-specific fields
  children_count INTEGER DEFAULT 0
);

-- Create children table for parent-child relationships
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  grade_level TEXT, -- e.g., 'Grade 9', 'Grade 10'
  school_name TEXT,
  subjects_struggling TEXT[], -- Subjects they need help with
  learning_style TEXT, -- e.g., 'visual', 'auditory', 'kinesthetic'
  special_needs TEXT -- Any special requirements
);

-- Create subjects table for standardized subject list
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- e.g., 'science', 'mathematics', 'language', 'social_studies'
  grade_levels TEXT[] NOT NULL,
  description TEXT
);

-- Create tutor_requests table (renamed from skill_requests)
CREATE TABLE IF NOT EXISTS tutor_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Request details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  
  -- Session preferences
  session_type TEXT NOT NULL CHECK (session_type IN ('online', 'home', 'either')),
  sessions_per_week INTEGER DEFAULT 1,
  session_duration_minutes INTEGER DEFAULT 60,
  total_sessions INTEGER, -- Total number of sessions needed
  
  -- Budget and timing
  budget_per_session DECIMAL(10,2) NOT NULL,
  budget_total DECIMAL(10,2),
  start_date DATE,
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('urgent', 'normal', 'flexible')),
  
  -- Location (for home tutoring)
  location_subcity TEXT,
  location_kebele TEXT,
  location_details TEXT,
  
  -- Request metadata
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'matched', 'in_progress', 'completed', 'cancelled')),
  selected_tutor_id UUID REFERENCES profiles(id),
  
  -- Matching preferences
  tutor_gender_preference TEXT CHECK (tutor_gender_preference IN ('male', 'female', 'no_preference')),
  tutor_experience_min INTEGER DEFAULT 0,
  special_requirements TEXT[]
);

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tutor_request_id UUID NOT NULL REFERENCES tutor_requests(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Proposal details
  cover_letter TEXT NOT NULL,
  proposed_rate DECIMAL(10,2) NOT NULL,
  available_start_date DATE,
  teaching_approach TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  response_time INTERVAL, -- How quickly tutor responded
  
  -- Additional info
  attachments TEXT[], -- URLs to certificates, recommendations, etc.
  sample_lesson_plan TEXT
);

-- Create sessions table to track tutoring sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  tutor_request_id UUID NOT NULL REFERENCES tutor_requests(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE SET NULL,
  
  -- Session details
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  session_type TEXT NOT NULL CHECK (session_type IN ('online', 'home')),
  
  -- Session content
  topic TEXT,
  objectives TEXT[],
  materials_needed TEXT[],
  homework_assigned TEXT,
  
  -- Status and completion
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled')),
  completed_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  
  -- Location (for home sessions)
  location_details TEXT,
  
  -- Payment
  amount_paid DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method TEXT -- e.g., 'telebirr', 'cbe_birr', 'cash'
);

-- Create messages table for communication
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tutor_request_id UUID REFERENCES tutor_requests(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  attachment_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tutor_request_id UUID NOT NULL REFERENCES tutor_requests(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  
  -- Specific ratings
  teaching_quality INTEGER CHECK (teaching_quality >= 1 AND teaching_quality <= 5),
  communication INTEGER CHECK (communication >= 1 AND communication <= 5),
  punctuality INTEGER CHECK (punctuality >= 1 AND punctuality <= 5),
  
  -- Outcomes
  grade_improvement TEXT, -- e.g., "Improved from C to B+"
  would_recommend BOOLEAN DEFAULT TRUE,
  
  -- Verification
  verified BOOLEAN DEFAULT FALSE -- To prevent fake reviews
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('new_proposal', 'session_reminder', 'payment_due', 'review_request', 'system')),
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT, -- Link to relevant page
  metadata JSONB -- Additional data for the notification
);

-- Insert Ethiopian education subjects
INSERT INTO subjects (name, category, grade_levels, description) VALUES
('Mathematics', 'mathematics', ARRAY['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Core mathematics curriculum'),
('English', 'language', ARRAY['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'English language and literature'),
('Amharic', 'language', ARRAY['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Amharic language and literature'),
('Physics', 'science', ARRAY['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Physical sciences and mechanics'),
('Chemistry', 'science', ARRAY['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Chemical sciences and laboratory work'),
('Biology', 'science', ARRAY['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Life sciences and biological systems'),
('History', 'social_studies', ARRAY['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Ethiopian and world history'),
('Geography', 'social_studies', ARRAY['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Physical and human geography'),
('Civics', 'social_studies', ARRAY['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Civic education and ethics'),
('Computer Science', 'technology', ARRAY['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'], 'Programming and computer literacy')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all tutor profiles" ON profiles FOR SELECT USING (user_type = 'tutor' OR auth.uid() = id);
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for children
CREATE POLICY "Parents can view own children" ON children FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can create children" ON children FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents can update own children" ON children FOR UPDATE USING (auth.uid() = parent_id);

-- Create policies for subjects
CREATE POLICY "Anyone can view subjects" ON subjects FOR SELECT USING (true);

-- Create policies for tutor_requests
CREATE POLICY "Anyone can view open tutor requests" ON tutor_requests FOR SELECT USING (true);
CREATE POLICY "Parents can create tutor requests" ON tutor_requests FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents can update own tutor requests" ON tutor_requests FOR UPDATE USING (auth.uid() = parent_id);

-- Create policies for proposals
CREATE POLICY "Relevant users can view proposals" ON proposals FOR SELECT USING (
  auth.uid() = tutor_id OR 
  auth.uid() IN (SELECT parent_id FROM tutor_requests WHERE id = tutor_request_id)
);
CREATE POLICY "Tutors can create proposals" ON proposals FOR INSERT WITH CHECK (auth.uid() = tutor_id);
CREATE POLICY "Tutors can update own proposals" ON proposals FOR UPDATE USING (auth.uid() = tutor_id);

-- Create policies for sessions
CREATE POLICY "Session participants can view sessions" ON sessions FOR SELECT USING (
  auth.uid() = tutor_id OR auth.uid() = parent_id
);
CREATE POLICY "Session participants can update sessions" ON sessions FOR UPDATE USING (
  auth.uid() = tutor_id OR auth.uid() = parent_id
);

-- Create policies for messages
CREATE POLICY "Users can view their messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their messages" ON messages FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Create policies for reviews
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for completed sessions" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Create policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON profiles(location_subcity);
CREATE INDEX IF NOT EXISTS idx_profiles_subjects ON profiles USING gin(subjects);
CREATE INDEX IF NOT EXISTS idx_profiles_verification ON profiles(verification_status);

CREATE INDEX IF NOT EXISTS idx_tutor_requests_status ON tutor_requests(status);
CREATE INDEX IF NOT EXISTS idx_tutor_requests_subject ON tutor_requests(subject);
CREATE INDEX IF NOT EXISTS idx_tutor_requests_location ON tutor_requests(location_subcity);
CREATE INDEX IF NOT EXISTS idx_tutor_requests_parent ON tutor_requests(parent_id);

CREATE INDEX IF NOT EXISTS idx_proposals_request ON proposals(tutor_request_id);
CREATE INDEX IF NOT EXISTS idx_proposals_tutor ON proposals(tutor_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);

CREATE INDEX IF NOT EXISTS idx_sessions_tutor ON sessions(tutor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_parent ON sessions(parent_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

CREATE INDEX IF NOT EXISTS idx_messages_request ON messages(tutor_request_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, user_type, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'parent'),
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

-- Create function to update tutor ratings
CREATE OR REPLACE FUNCTION public.update_tutor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews 
      WHERE reviewee_id = NEW.reviewee_id
    )
  WHERE id = NEW.reviewee_id AND user_type = 'tutor';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for rating updates
DROP TRIGGER IF EXISTS update_tutor_rating_trigger ON reviews;
CREATE TRIGGER update_tutor_rating_trigger
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_tutor_rating();

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
DROP TRIGGER IF EXISTS update_children_updated_at ON children;
DROP TRIGGER IF EXISTS update_tutor_requests_updated_at ON tutor_requests;
DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutor_requests_updated_at BEFORE UPDATE ON tutor_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 