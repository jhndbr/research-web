import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ResearchGrid } from '@/components/research-grid'
import { ResearchFilters } from '@/components/research-filters'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Research Publications - Dr. Cristiano De Angelis',
  description: 'Academic research publications by Dr. Cristiano De Angelis covering Knowledge Management, Organizational Intelligence, and Public Administration across multiple countries and continents.',
}

async function getResearchPapers(searchParams: any) {
  const { continente, especialidad, pais, search } = searchParams

  const where: any = {
    published: true,
  }

  if (continente && continente !== 'todos') {
    where.continent = continente
  }

  if (especialidad && especialidad !== 'todas') {
    where.specialty = especialidad
  }

  if (pais && pais !== 'todos') {
    where.country = pais
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { country: { contains: search, mode: 'insensitive' } },
      { specialty: { contains: search, mode: 'insensitive' } },
    ]
  }

  return await prisma.researchPaper.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })
}

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const papers = await getResearchPapers(searchParams)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16 pb-8 border-b border-gray-200">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Research Publications
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Academic research across multiple countries and disciplines
            </p>
            
            {/* Academic Metrics */}
            <div className="flex justify-center items-center gap-8 flex-wrap text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{papers.length}</div>
                <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Publications</div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">15</div>
                <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Countries</div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">6</div>
                <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Continents</div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">7</div>
                <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">Specialties</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Suspense fallback={<div className="text-center text-gray-600">Loading filters...</div>}>
            <ResearchFilters />
          </Suspense>

          {/* Results */}
          <Suspense fallback={<div className="text-center text-gray-600">Loading research papers...</div>}>
            <ResearchGrid papers={papers} />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}