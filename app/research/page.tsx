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
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text">
              Research Publications
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Explore academic research by Dr. Cristiano De Angelis across multiple countries and disciplines
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-white mb-2">{papers.length}+</div>
                <div className="text-white/70">Publications</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-white/70">Countries</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-white mb-2">5</div>
                <div className="text-white/70">Continents</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Suspense fallback={<div className="text-center text-white">Loading filters...</div>}>
            <ResearchFilters />
          </Suspense>

          {/* Results */}
          <Suspense fallback={<div className="text-center text-white">Loading research papers...</div>}>
            <ResearchGrid papers={papers} />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}