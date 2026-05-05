-- Create staff_profiles table
CREATE TABLE IF NOT EXISTS staff_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialty TEXT,
  email TEXT NOT NULL UNIQUE,
  photo_url TEXT,
  bio TEXT,
  department TEXT,
  rank TEXT,
  phone TEXT,
  office TEXT,
  research_interests TEXT,
  publications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_staff_email ON staff_profiles(email);
CREATE INDEX IF NOT EXISTS idx_staff_name ON staff_profiles(name);
