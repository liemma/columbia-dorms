import Link from "next/link";
import { Star, MapPin, Users, Building2, Search } from "lucide-react";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Columbia Dorm
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover honest reviews, ratings, and insights from real Columbia students 
            to help you choose the best dorm for your college experience.
          </p>
          
          {/* Search Form */}
          <div className="mb-8 max-w-md mx-auto">
            <SearchForm />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dorms"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Browse All Dorms
            </Link>
            <Link
              href="/dorms"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Columbia Dorms?</h3>
          <p className="text-lg text-gray-600">Get the inside scoop on campus living</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Honest Reviews</h4>
            <p className="text-gray-600">
              Real reviews from Columbia students who actually lived in these dorms.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Location Details</h4>
            <p className="text-gray-600">
              Detailed information about location, proximity to classes, and campus amenities.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Community Insights</h4>
            <p className="text-gray-600">
              Learn about the social atmosphere, study environment, and community culture.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Home Away From Home?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of Columbia students who have found their perfect dorm match.
          </p>
          <Link
            href="/dorms"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
          >
            Start Exploring Dorms
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Columbia Dorms</span>
            </div>
            <p className="text-gray-600 mb-4">
              Helping Columbia students find their perfect dorm since 2024.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/dorms" className="text-gray-600 hover:text-blue-600 transition-colors">
                Browse Dorms
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
