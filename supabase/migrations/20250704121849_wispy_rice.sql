/*
  # Create Follows Table

  1. New Tables
    - `follows`
      - `id` (uuid, primary key) - Unique follow identifier
      - `follower_id` (uuid, foreign key) - User who is following
      - `following_id` (uuid, foreign key) - User being followed
      - `created_at` (timestamp) - Follow creation date

  2. Security
    - Enable RLS on `follows` table
    - Add policies for managing follows
    - Ensure users cannot follow themselves
*/

CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES users(id) ON DELETE CASCADE,
  following_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure users cannot follow themselves
  CONSTRAINT check_no_self_follow CHECK (follower_id != following_id),
  
  -- Ensure unique follows
  UNIQUE(follower_id, following_id)
);

-- Enable RLS
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Users can read all follows
CREATE POLICY "Users can read follows"
  ON follows
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create their own follows
CREATE POLICY "Users can create own follows"
  ON follows
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = follower_id);

-- Users can delete their own follows
CREATE POLICY "Users can delete own follows"
  ON follows
  FOR DELETE
  TO authenticated
  USING (auth.uid() = follower_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);