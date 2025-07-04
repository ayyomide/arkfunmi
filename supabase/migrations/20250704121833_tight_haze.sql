/*
  # Create Comments Table

  1. New Tables
    - `comments`
      - `id` (uuid, primary key) - Unique comment identifier
      - `content` (text) - Comment content
      - `article_id` (uuid, foreign key) - Reference to articles table
      - `author_id` (uuid, foreign key) - Reference to users table
      - `parent_id` (uuid, foreign key) - Reference to parent comment for replies
      - `likes_count` (integer) - Number of likes on comment
      - `is_edited` (boolean) - Whether comment has been edited
      - `created_at` (timestamp) - Comment creation date
      - `updated_at` (timestamp) - Last update date

  2. Security
    - Enable RLS on `comments` table
    - Add policies for reading comments and managing own comments
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  likes_count integer DEFAULT 0,
  is_edited boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments on published articles
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = comments.article_id 
      AND articles.status = 'published'
    )
  );

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Authors can update their own comments
CREATE POLICY "Authors can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Authors can delete their own comments
CREATE POLICY "Authors can delete own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create updated_at trigger
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);