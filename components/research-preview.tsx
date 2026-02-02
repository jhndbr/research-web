'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ResearchPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Research Publications
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover academic research spanning multiple continents, countries, and veterinary specialties.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-700">Research Papers</div>
              <p className="text-sm text-gray-500 mt-2">
                Published in renowned international journals
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-700">Countries</div>
              <p className="text-sm text-gray-500 mt-2">
                Research conducted across multiple nations
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-700">Specialties</div>
              <p className="text-sm text-gray-500 mt-2">
                Veterinary medicine and related fields
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Link href="/research">
              <Button 
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3"
              >
                Explore All Research
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}