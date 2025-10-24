'use client'

import { Button } from '@/components/ui/button'

interface ResearchPaper {
  id: string
  title: string
  description: string
  url: string
  continent: string
  specialty: string
  country: string
  publishedAt: Date
  author?: {
    name: string | null
    image: string | null
  } | null
}

interface ResearchGridProps {
  papers: ResearchPaper[]
}

export function ResearchGrid({ papers }: ResearchGridProps) {
  if (papers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="glass-card p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">
            No se encontraron resultados
          </h3>
          <p className="text-white/70 mb-6">
            No hay investigaciones que coincidan con los criterios de búsqueda actuales.
          </p>
          <Button 
            onClick={() => window.location.href = '/research'}
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            Ver todas las investigaciones
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {papers.map((paper) => (
        <div
          key={paper.id}
          className="glass-card p-6 hover:bg-white/10 transition-all duration-300 paper-card"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {paper.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="filter-tag text-xs">
                    {paper.continent}
                  </span>
                  <span className="filter-tag text-xs">
                    {paper.country}
                  </span>
                  <span className="filter-tag text-xs">
                    {paper.specialty}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-6 flex-1 line-clamp-4">
              {paper.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/60">
                {new Date(paper.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
              
              <Button
                onClick={() => window.open(paper.url, '_blank')}
                variant="outline"
                size="sm"
                className="border-white/20 hover:bg-white/10 text-white"
              >
                Leer artículo
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}