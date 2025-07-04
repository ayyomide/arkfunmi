/*
  # Create Newsletter Subscriptions Table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key) - Unique subscription identifier
      - `email` (text, unique) - Subscriber email address
      - `is_active` (boolean) - Subscription status
      - `preferences` (jsonb) - Subscription preferences (categories, frequency)
      - `created_at` (timestamp) - Subscription creation date
      - `updated_at` (timestamp) - Last update date

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policies for managing subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  preferences jsonb DEFAULT '{"categories": ["all"], "frequency": "weekly"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can create newsletter subscriptions
CREATE POLICY "Anyone can create newsletter subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  USING (true);

-- Only admins can read newsletter subscriptions (for sending emails)
CREATE POLICY "Admins can read newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.email IN ('admin@arcfunmi.com', 'support@arcfunmi.com')
    )
  );

-- Subscribers can update their own subscription by email
CREATE POLICY "Subscribers can update own subscription"
  ON newsletter_subscriptions
  FOR UPDATE
  USING (true);

-- Create updated_at trigger
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_is_active ON newsletter_subscriptions(is_active);