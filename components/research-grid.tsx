'use client'

import Link from 'next/link'

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
          <h3 className="text-xl font-semibold text-foreground mb-4">
            No se encontraron resultados
          </h3>
          <p className="text-muted-foreground mb-6">
            No hay investigaciones que coincidan con los criterios de búsqueda actuales.
          </p>
          <Link 
            href="/research"
            className="inline-block px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent transition-colors"
          >
            Ver todas las investigaciones
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {papers.map((paper) => (
        <article
          key={paper.id}
          className="bg-card border border-border hover:border-foreground/30 rounded-lg p-6 transition-all hover:shadow-sm"
        >
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-xl font-serif font-bold text-foreground mb-3 leading-tight hover:text-foreground/80 transition-colors">
                {paper.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                  {paper.continent}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                  {paper.country}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                  {paper.specialty}
                </span>
              </div>
            </div>
            
            {/* Abstract */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {paper.description}
            </p>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <time className="text-xs text-muted-foreground font-medium">
                {new Date(paper.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Read paper →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}