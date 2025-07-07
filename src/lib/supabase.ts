import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our database
export type Dorm = {
  id: string
  name: string
  description: string
  location: string
  image_url: string
  created_at: string
  updated_at: string
}

export type Review = {
  id: string
  dorm_id: string
  user_id: string
  rating: number
  title: string
  content: string
  tags: string[]
  created_at: string
  updated_at: string
}

export type DormWithReviews = Dorm & {
  reviews: Review[]
  average_rating: number
  review_count: number
}
