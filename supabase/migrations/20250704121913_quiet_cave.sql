/*
  # Create Article Views Table

  1. New Tables
    - `article_views`
      - `id` (uuid, primary key) - Unique view identifier
      - `article_id` (uuid, foreign key) - Reference to articles table
      - `user_id` (uuid, foreign key) - Reference to users table (nullable for anonymous views)
      - `ip_address` (text) - IP address for anonymous tracking
      - `user_agent` (text) - Browser/device information
      - `created_at` (timestamp) - View timestamp

  2. Security
    - Enable RLS on `article_views` table
    - Add policies for tracking views
*/

CREATE TABLE IF NOT EXISTS article_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

-- Anyone can create article views
CREATE POLICY "Anyone can create article views"
  ON article_views
  FOR INSERT
  USING (true);

-- Authors can read views for their articles
CREATE POLICY "Authors can read own article views"
  ON article_views
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = article_views.article_id 
      AND articles.author_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_user_id ON article_views(user_id);
CREATE INDEX IF NOT EXISTS idx_article_views_created_at ON article_views(created_at);