/*
  # Create Articles Table

  1. New Tables
    - `articles`
      - `id` (uuid, primary key) - Unique article identifier
      - `title` (text) - Article title
      - `slug` (text, unique) - URL-friendly article identifier
      - `excerpt` (text) - Article summary/description
      - `content` (text) - Full article content (rich text/markdown)
      - `featured_image_url` (text) - Main article image
      - `author_id` (uuid, foreign key) - Reference to users table
      - `category` (text) - Article category
      - `tags` (text array) - Article tags for searchability
      - `status` (text) - draft, published, archived
      - `is_featured` (boolean) - Featured article status
      - `read_time` (integer) - Estimated reading time in minutes
      - `views_count` (integer) - Number of views
      - `likes_count` (integer) - Number of likes
      - `comments_count` (integer) - Number of comments
      - `shares_count` (integer) - Number of shares
      - `published_at` (timestamp) - Publication date
      - `created_at` (timestamp) - Creation date
      - `updated_at` (timestamp) - Last update date

  2. Security
    - Enable RLS on `articles` table
    - Add policies for reading published articles and managing own articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image_url text DEFAULT '',
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured boolean DEFAULT false,
  read_time integer DEFAULT 5,
  views_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Anyone can read published articles"
  ON articles
  FOR SELECT
  USING (status = 'published');

-- Authors can read their own articles (including drafts)
CREATE POLICY "Authors can read own articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

-- Authors can create articles
CREATE POLICY "Authors can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Authors can update their own articles
CREATE POLICY "Authors can update own articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Authors can delete their own articles
CREATE POLICY "Authors can delete own articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create updated_at trigger
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);