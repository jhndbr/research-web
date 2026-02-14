'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { X, Filter } from 'lucide-react'

export function ResearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [activeFilters, setActiveFilters] = useState({
    continente: searchParams.get('continente') || 'todos',
    especialidad: searchParams.get('especialidad') || 'todas',
    pais: searchParams.get('pais') || 'todos',
  })

  const [showFilters, setShowFilters] = useState(true)

  const continents = [
    'todos',
    'África',
    'Asia', 
    'Europa',
    'América del Norte',
    'América del Sur',
    'Global'
  ]

  const specialties = [
    'todas',
    'Gestión del Conocimiento',
    'Inteligencia Organizacional',
    'Gobernanza y Administración Pública',
    'Desarrollo Sustentable',
    'Educación y Participación Social',
    'Innovación y Desarrollo',
    'Agricultura e Hidrología'
  ]

  const countries = [
    'todos',
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'England',
    'France',
    'India',
    'Mexico',
    'Nigeria',
    'Portugal',
    'Spain',
    'United States'
  ]

  const updateFilter = (type: string, value: string) => {
    const newFilters = { ...activeFilters, [type]: value }
    setActiveFilters(newFilters)
    
    const params = new URLSearchParams()
    
    if (newFilters.continente !== 'todos') {
      params.set('continente', newFilters.continente)
    }
    if (newFilters.especialidad !== 'todas') {
      params.set('especialidad', newFilters.especialidad)
    }
    if (newFilters.pais !== 'todos') {
      params.set('pais', newFilters.pais)
    }
    
    router.push(`/research?${params.toString()}`)
  }

  const clearFilters = () => {
    setActiveFilters({
      continente: 'todos',
      especialidad: 'todas', 
      pais: 'todos'
    })
    router.push('/research')
  }

  const hasActiveFilters = activeFilters.continente !== 'todos' || 
                           activeFilters.especialidad !== 'todas' || 
                           activeFilters.pais !== 'todos'

  return (
    <div className="mb-8">
      {/* Filter Toggle and Active Filters */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 rounded-md bg-card border border-border text-foreground hover:bg-accent transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.continente !== 'todos' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
              {activeFilters.continente}
              <button
                onClick={() => updateFilter('continente', 'todos')}
                className="ml-2 hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {activeFilters.especialidad !== 'todas' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
              {activeFilters.especialidad}
              <button
                onClick={() => updateFilter('especialidad', 'todas')}
                className="ml-2 hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {activeFilters.pais !== 'todos' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
              {activeFilters.pais}
              <button
                onClick={() => updateFilter('pais', 'todos')}
                className="ml-2 hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Continente */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Continente
              </label>
              <select
                value={activeFilters.continente}
                onChange={(e) => updateFilter('continente', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                {continents.map((continent) => (
                  <option key={continent} value={continent}>
                    {continent === 'todos' ? 'Todos los continentes' : continent}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidad */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Especialidad
              </label>
              <select
                value={activeFilters.especialidad}
                onChange={(e) => updateFilter('especialidad', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'todas' ? 'Todas las especialidades' : specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                País
              </label>
              <select
                value={activeFilters.pais}
                onChange={(e) => updateFilter('pais', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country === 'todos' ? 'Todos los países' : country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}