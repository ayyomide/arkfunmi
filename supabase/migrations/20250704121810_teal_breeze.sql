/*
  # Create Users Table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique user identifier
      - `email` (text, unique) - User email address
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `profession` (text) - User's profession/role
      - `bio` (text) - User biography
      - `avatar_url` (text) - Profile picture URL
      - `website` (text) - Personal/company website
      - `linkedin_url` (text) - LinkedIn profile URL
      - `twitter_url` (text) - Twitter profile URL
      - `location` (text) - User location
      - `years_experience` (integer) - Years of professional experience
      - `specializations` (text array) - Areas of expertise
      - `is_verified` (boolean) - Professional verification status
      - `is_featured` (boolean) - Featured contributor status
      - `email_verified` (boolean) - Email verification status
      - `created_at` (timestamp) - Account creation date
      - `updated_at` (timestamp) - Last profile update

  2. Security
    - Enable RLS on `users` table
    - Add policies for users to read public profiles and manage their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  profession text NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  website text DEFAULT '',
  linkedin_url text DEFAULT '',
  twitter_url text DEFAULT '',
  location text DEFAULT '',
  years_experience integer DEFAULT 0,
  specializations text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read all public profile data
CREATE POLICY "Users can read public profiles"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Users can insert their own profile (for signup)
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();