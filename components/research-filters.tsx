'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function ResearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [activeFilters, setActiveFilters] = useState({
    continente: searchParams.get('continente') || 'todos',
    especialidad: searchParams.get('especialidad') || 'todas',
    pais: searchParams.get('pais') || 'todos',
  })

  const continents = [
    'todos',
    'África',
    'Asia', 
    'Europa',
    'América del Norte',
    'América del Sur',
    'Oceanía'
  ]

  const specialties = [
    'todas',
    'Microbiología Veterinaria',
    'Medicina Preventiva Veterinaria', 
    'Parasitología Veterinaria',
    'Nutrición Animal',
    'Medicina Veterinaria Clínica',
    'Genética Animal'
  ]

  const countries = [
    'todos',
    'Argentina',
    'Australia', 
    'Brasil',
    'Canadá',
    'Chile',
    'Estados Unidos',
    'Francia',
    'Alemania',
    'India',
    'Japón',
    'México',
    'Reino Unido',
    'Sudáfrica'
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

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Filtrar Investigaciones</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-white/70 hover:text-white"
        >
          Limpiar filtros
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Continentes */}
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-3">Continente</h3>
          <div className="flex flex-wrap gap-2">
            {continents.map((continent) => (
              <Button
                key={continent}
                variant={activeFilters.continente === continent ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('continente', continent)}
                className={
                  activeFilters.continente === continent
                    ? 'bg-primary-600 text-white'
                    : 'border-white/20 text-white/80 hover:bg-white/10'
                }
              >
                {continent === 'todos' ? 'Todos' : continent}
              </Button>
            ))}
          </div>
        </div>

        {/* Especialidades */}
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-3">Especialidad</h3>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={activeFilters.especialidad === specialty ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('especialidad', specialty)}
                className={
                  activeFilters.especialidad === specialty
                    ? 'bg-primary-600 text-white'
                    : 'border-white/20 text-white/80 hover:bg-white/10'
                }
              >
                {specialty === 'todas' ? 'Todas' : specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Países */}
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-3">País</h3>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <Button
                key={country}
                variant={activeFilters.pais === country ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('pais', country)}
                className={
                  activeFilters.pais === country
                    ? 'bg-primary-600 text-white'
                    : 'border-white/20 text-white/80 hover:bg-white/10'
                }
              >
                {country === 'todos' ? 'Todos' : country}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}