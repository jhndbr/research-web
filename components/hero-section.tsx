import Image from 'next/image'
import Link from 'next/link'
import { Globe, Users, BookOpen, Award, GraduationCap, MapPin } from 'lucide-react'

export function HeroSection() {
  const continents = [
    { name: 'África', icon: Globe },
    { name: 'Asia', icon: Globe },
    { name: 'Europa', icon: Globe },
    { name: 'América del Norte', icon: Globe },
    { name: 'América del Sur', icon: Globe },
    { name: 'Global', icon: Globe },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <Image
                src="/images/20190708_dr_cristiano.jpg"
                alt="Dr. Cristiano De Angelis"
                width={200}
                height={200}
                className="rounded-full ring-2 ring-gray-200 shadow-lg object-cover grayscale hover:grayscale-0 transition-all duration-300"
                priority
                style={{ aspectRatio: '1/1' }}
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-gray-900 tracking-tight">
              Cristiano Trindade De Angelis
            </h1>
            <p className="text-lg text-gray-600 font-medium mb-2">PhD in Knowledge Management</p>
            <p className="text-base text-gray-500">Organizational Intelligence & Public Administration</p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Comparative research on Knowledge Management and Organizational Intelligence between 
              the Brazilian and German federal governments.
            </p>
            <p className="text-sm text-gray-600">
              Professor at Unisul and UFSC, Florianópolis, Santa Catarina, Brazil
            </p>
          </div>

          {/* Academic Metrics */}
          <div className="flex justify-center items-center gap-12 mb-16 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Publications</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Countries</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Continents</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Books</div>
            </div>
          </div>
        </div>

        {/* Research Access Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Academic Portfolio
            </h2>
            <p className="text-gray-600">
              Explore research publications and books spanning multiple disciplines
            </p>
          </div>

          {/* Main Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/research"
              className="group bg-white border-2 border-gray-200 hover:border-gray-900 rounded-lg p-8 transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Research Publications
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  42 academic papers on Knowledge Management, Organizational Intelligence, 
                  and Public Administration across 15 countries
                </p>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900 group-hover:translate-x-1 transition-transform">
                Browse publications →
              </div>
            </Link>

            <Link
              href="/books"
              className="group bg-white border-2 border-gray-200 hover:border-gray-900 rounded-lg p-8 transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Published Books
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Academic books available in English, Portuguese, and Spanish on 
                  Management by Intelligences
                </p>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900 group-hover:translate-x-1 transition-transform">
                View books →
              </div>
            </Link>
          </div>

          {/* Regional Filter */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-4">Browse by Region</h3>
            <div className="flex flex-wrap gap-2">
              {continents.map((continent) => (
                <Link
                  key={continent.name}
                  href={`/research?continente=${encodeURIComponent(continent.name)}`}
                  className="px-4 py-2 text-sm bg-white border border-gray-300 hover:border-gray-900 rounded text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  {continent.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}