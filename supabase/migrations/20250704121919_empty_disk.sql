/*
  # Create Database Functions and Triggers

  1. Functions
    - Update article counts when likes/comments change
    - Update user follower counts
    - Generate article slugs
    - Update article view counts

  2. Triggers
    - Auto-update counts when related data changes
    - Auto-generate slugs for articles
*/

-- Function to update article likes count
CREATE OR REPLACE FUNCTION update_article_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE articles 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE articles 
    SET likes_count = GREATEST(likes_count - 1, 0) 
    WHERE id = OLD.article_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update comment likes count
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE comments 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.comment_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE comments 
    SET likes_count = GREATEST(likes_count - 1, 0) 
    WHERE id = OLD.comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update article comments count
CREATE OR REPLACE FUNCTION update_article_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE articles 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE articles 
    SET comments_count = GREATEST(comments_count - 1, 0) 
    WHERE id = OLD.article_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to generate article slug
CREATE OR REPLACE FUNCTION generate_article_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  -- Generate base slug from title
  base_slug := lower(trim(regexp_replace(NEW.title, '[^a-zA-Z0-9\s]', '', 'g')));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := trim(base_slug, '-');
  
  -- Ensure slug is not empty
  IF base_slug = '' THEN
    base_slug := 'article';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for existing slugs and append counter if needed
  WHILE EXISTS (SELECT 1 FROM articles WHERE slug = final_slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update article view count
CREATE OR REPLACE FUNCTION update_article_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE articles 
  SET views_count = views_count + 1 
  WHERE id = NEW.article_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for article likes
CREATE TRIGGER trigger_update_article_likes_count
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.article_id IS NOT NULL OR OLD.article_id IS NOT NULL)
  EXECUTE FUNCTION update_article_likes_count();

-- Create triggers for comment likes
CREATE TRIGGER trigger_update_comment_likes_count
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.comment_id IS NOT NULL OR OLD.comment_id IS NOT NULL)
  EXECUTE FUNCTION update_comment_likes_count();

-- Create triggers for article comments count
CREATE TRIGGER trigger_update_article_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_article_comments_count();

-- Create trigger for article slug generation
CREATE TRIGGER trigger_generate_article_slug
  BEFORE INSERT OR UPDATE OF title ON articles
  FOR EACH ROW
  EXECUTE FUNCTION generate_article_slug();

-- Create trigger for article view count
CREATE TRIGGER trigger_update_article_view_count
  AFTER INSERT ON article_views
  FOR EACH ROW
  EXECUTE FUNCTION update_article_view_count();