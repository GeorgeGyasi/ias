-- Create staff profiles table
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

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  is_super_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for staff_profiles (allow authenticated admins to read/write)
CREATE POLICY "Allow admin read all staff" ON staff_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin write all staff" ON staff_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin update all staff" ON staff_profiles
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin delete all staff" ON staff_profiles
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for admin_users
CREATE POLICY "Allow users read own admin info" ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create storage bucket for staff photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('staff-photos', 'staff-photos', true)
ON CONFLICT DO NOTHING;

-- Set public access for staff photos
CREATE POLICY "Public read access on staff photos" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'staff-photos');

CREATE POLICY "Admin write access on staff photos" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'staff-photos');

CREATE POLICY "Admin delete access on staff photos" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'staff-photos');

-- Create index for email lookup
CREATE INDEX idx_staff_email ON staff_profiles(email);
CREATE INDEX idx_admin_email ON admin_users(email);
