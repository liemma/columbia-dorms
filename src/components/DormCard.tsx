import Link from 'next/link'
import { DormWithReviews } from '@/lib/supabase'

interface DormCardProps {
  dorm: DormWithReviews
}

export function DormCard({ dorm }: DormCardProps) {
  // Calculate average rating
  const averageRating = dorm.reviews.length > 0 
    ? dorm.reviews.reduce((sum, review) => sum + review.rating, 0) / dorm.reviews.length 
    : 0

  const reviewCount = dorm.reviews.length

  return (
    <Link href={`/dorms/${dorm.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Dorm Image */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          {dorm.image_url ? (
            <img 
              src={dorm.image_url} 
              alt={dorm.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">{dorm.name}</span>
            </div>
          )}
        </div>
        
        {/* Dorm Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {dorm.name}
            </h3>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {dorm.type}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {dorm.description}
          </p>
          
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {averageRating > 0 ? (
                <>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
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
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    {averageRating.toFixed(1)} ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-500">No reviews yet</span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>📍 {dorm.location}</span>
            </div>
          </div>
          
          {/* Features */}
          {dorm.features && dorm.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {dorm.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
              {dorm.features.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{dorm.features.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
