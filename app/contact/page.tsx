import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export const metadata = {
  title: 'Contact - Dr. Cristiano De Angelis',
  description: 'Get in touch with Dr. Cristiano De Angelis for research collaborations, speaking engagements, or academic inquiries.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get in touch for research collaborations, speaking engagements, or academic inquiries
            </p>
          </div>

          {/* Contact Information */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a 
                    href="mailto:cristianotrindade@protonmail.com"
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    cristianotrindade@protonmail.com
                  </a>
                </div>
              </div>

              {/* Research Areas */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Research Areas</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Knowledge Management</li>
                    <li>• Organizational Intelligence</li>
                    <li>• Public Administration</li>
                    <li>• Cultural Intelligence</li>
                    <li>• Governmental Intelligence</li>
                  </ul>
                </div>
              </div>

              {/* Academic Interests */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Collaboration Opportunities</h3>
                  <p className="text-gray-600">
                    Open to research collaborations, speaking engagements, academic partnerships, 
                    and consulting opportunities in areas related to knowledge management, 
                    organizational intelligence, and public administration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/research"
                className="inline-flex items-center justify-start px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Research Publications
              </Link>
              <Link 
                href="/books"
                className="inline-flex items-center justify-start px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Published Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
