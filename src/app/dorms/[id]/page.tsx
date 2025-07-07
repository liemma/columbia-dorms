'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { ReviewForm } from '@/components/ReviewForm'
import { ReviewList } from '@/components/ReviewList'

interface Review {
  id: string
  rating: number
  title: string
  content: string
  tags: string[]
  created_at: string
  user_id: string
}

interface Dorm {
  id: string
  name: string
  description: string
  location: string
  type: string
  image_url?: string
  features?: string[]
  reviews?: Review[]
}

interface DormDetailPageProps {
  params: {
    id: string
  }
}

export default function DormDetailPage({ params }: DormDetailPageProps) {
  const [dorm, setDorm] = useState<Dorm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
  
  const fetchDormData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: dormData, error: dormError } = await supabase
        .from('dorms')
        .select(`
          *,
          reviews (
            id,
            rating,
            title,
            content,
            tags,
            created_at,
            user_id
          )
        `)
        .eq('id', params.id)
        .single()

      if (dormError) {
        if (dormError.code === 'PGRST116') {
          // Record not found
          router.push('/404')
          return
        }
        throw dormError
      }

      setDorm(dormData)
    } catch (err) {
      console.error('Error fetching dorm data:', err)
      setError('Failed to load dorm data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDormData()
  }, [params.id])

  const handleReviewSubmitted = () => {
    // Refresh the dorm data to include the new review
    fetchDormData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dorm details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDormData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!dorm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Dorm not found</p>
        </div>
      </div>
    )
  }

  // Calculate average rating and stats
  const reviews = dorm.reviews || []
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0
  
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-w-16 aspect-h-9">
              {dorm.image_url ? (
                <img 
                  src={dorm.image_url} 
                  alt={dorm.name}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{dorm.name}</span>
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{dorm.name}</h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {dorm.type}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-600">📍 {dorm.location}</span>
              </div>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(averageRating) 
                          ? 'text-yellow-400' 
                          : i < averageRating 
                          ? 'text-yellow-300' 
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-2xl font-semibold text-gray-900">
                    {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <span className="text-gray-600">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                {dorm.description}
              </p>
              
              {/* Features */}
              {dorm.features && dorm.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {dorm.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
              
              {reviews.length > 0 ? (
                <ReviewList reviews={reviews} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Distribution */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 w-3">{rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-6">
                        {ratingDistribution[rating as keyof typeof ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add Review Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
              <ReviewForm dormId={dorm.id} onReviewSubmitted={handleReviewSubmitted} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

