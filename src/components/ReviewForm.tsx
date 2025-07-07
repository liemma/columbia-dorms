'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

interface ReviewFormProps {
  dormId: string
  onReviewSubmitted?: () => void
}

export function ReviewForm({ dormId, onReviewSubmitted }: ReviewFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [tags, setTags] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!title || !content || rating === 0) {
      setError('Please fill in all required fields and select a rating.')
      setIsSubmitting(false)
      return
    }

    try {
      // Parse tags (split by comma and clean up)
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const { error: submitError } = await supabase
        .from('reviews')
        .insert({
          dorm_id: dormId,
          title,
          content,
          rating,
          tags: tagArray.length > 0 ? tagArray : null,
        })

      if (submitError) {
        throw submitError
      }

      // Reset form
      setTitle('')
      setContent('')
      setRating(0)
      setTags('')
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your review.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                className={`w-8 h-8 ${
                  i < (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 ? `${rating}/5` : 'Select a rating'}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Review Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Summarize your experience..."
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your detailed experience living in this dorm..."
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Optional)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., quiet, social, spacious, good location (separate with commas)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Add tags to help other students find relevant reviews
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  )
}
