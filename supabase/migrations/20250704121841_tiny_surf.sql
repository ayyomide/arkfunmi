/*
  # Create Likes Table

  1. New Tables
    - `likes`
      - `id` (uuid, primary key) - Unique like identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `article_id` (uuid, foreign key) - Reference to articles table (nullable)
      - `comment_id` (uuid, foreign key) - Reference to comments table (nullable)
      - `created_at` (timestamp) - Like creation date

  2. Security
    - Enable RLS on `likes` table
    - Add policies for managing likes
    - Ensure users can only like once per item
*/

CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure either article_id or comment_id is set, but not both
  CONSTRAINT check_like_target CHECK (
    (article_id IS NOT NULL AND comment_id IS NULL) OR
    (article_id IS NULL AND comment_id IS NOT NULL)
  ),
  
  -- Ensure unique likes per user per item
  UNIQUE(user_id, article_id),
  UNIQUE(user_id, comment_id)
);

-- Enable RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Users can read all likes
CREATE POLICY "Users can read likes"
  ON likes
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create their own likes
CREATE POLICY "Users can create own likes"
  ON likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete own likes"
  ON likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_article_id ON likes(article_id);
CREATE INDEX IF NOT EXISTS idx_likes_comment_id ON likes(comment_id);