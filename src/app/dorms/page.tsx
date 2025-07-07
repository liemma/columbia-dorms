import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { DormCard } from '@/components/DormCard'
import { DormWithReviews } from '@/lib/supabase'

export default async function DormsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  
  // Fetch all dorms with their reviews and calculate average ratings
  const { data: dorms, error } = await supabase
    .from('dorms')
    .select(`
      *,
      reviews (
        rating,
        title,
        content,
        tags,
        created_at,
        user_id
      )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching dorms:', error)
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Columbia University Dorms</h1>
            <p className="text-red-600">Error loading dorms. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  const dormsWithReviews = dorms as DormWithReviews[]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Columbia University Dorms</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore student reviews and ratings for Columbia University residence halls. 
            Find the perfect dorm for your college experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dormsWithReviews.map((dorm) => (
            <DormCard key={dorm.id} dorm={dorm} />
          ))}
        </div>

        {dormsWithReviews.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No dorms found</h3>
            <p className="text-gray-500">Check back later for dorm listings.</p>
          </div>
        )}
      </div>
    </div>
  )
}
