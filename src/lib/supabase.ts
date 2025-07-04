import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  profession: string
  bio?: string
  avatar_url?: string
  website?: string
  linkedin_url?: string
  twitter_url?: string
  location?: string
  years_experience?: number
  specializations?: string[]
  is_verified?: boolean
  is_featured?: boolean
  email_verified?: boolean
  created_at?: string
  updated_at?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url?: string
  author_id: string
  category: string
  tags?: string[]
  status: 'draft' | 'published' | 'archived'
  is_featured?: boolean
  read_time?: number
  views_count?: number
  likes_count?: number
  comments_count?: number
  shares_count?: number
  published_at?: string
  created_at?: string
  updated_at?: string
  author?: User
}

export interface Comment {
  id: string
  content: string
  article_id: string
  author_id: string
  parent_id?: string
  likes_count?: number
  is_edited?: boolean
  created_at?: string
  updated_at?: string
  author?: User
}

export interface Like {
  id: string
  user_id: string
  article_id?: string
  comment_id?: string
  created_at?: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at?: string
}

export interface Bookmark {
  id: string
  user_id: string
  article_id: string
  created_at?: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'like' | 'comment' | 'follow' | 'article_published' | 'mention'
  title: string
  message: string
  data?: any
  is_read?: boolean
  created_at?: string
}