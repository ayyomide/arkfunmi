/*
  # Create Bookmarks Table

  1. New Tables
    - `bookmarks`
      - `id` (uuid, primary key) - Unique bookmark identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `article_id` (uuid, foreign key) - Reference to articles table
      - `created_at` (timestamp) - Bookmark creation date

  2. Security
    - Enable RLS on `bookmarks` table
    - Add policies for managing bookmarks
*/

CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure unique bookmarks per user per article
  UNIQUE(user_id, article_id)
);

-- Enable RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can read their own bookmarks
CREATE POLICY "Users can read own bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own bookmarks
CREATE POLICY "Users can create own bookmarks"
  ON bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_article_id ON bookmarks(article_id);