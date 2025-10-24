'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown, Globe, Users, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const continents = [
    { name: 'África', icon: Globe },
    { name: 'Asia', icon: Globe },
    { name: 'Europa', icon: Globe },
    { name: 'América del Norte', icon: Globe },
    { name: 'América del Sur', icon: Globe },
    { name: 'Oceanía', icon: Globe },
  ]

  const specialties = [
    'Microbiología Veterinaria',
    'Medicina Preventiva Veterinaria',
    'Parasitología Veterinaria',
    'Nutrición Animal',
    'Medicina Veterinaria Clínica',
    'Genética Animal',
  ]

  const countries = [
    'Argentina', 'Australia', 'Brasil', 'Canadá', 'Chile', 'Estados Unidos',
    'Francia', 'Alemania', 'India', 'Japón', 'México', 'Reino Unido', 'Sudáfrica'
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <Image
              src="/images/20190708_dr_cristiano.jpg"
              alt="Dr. Cristiano De Angelis"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-6 ring-4 ring-white/20"
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 gradient-text">
            Dr. Cristiano De Angelis
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-4xl mx-auto">
            His PhD Thesis was a comparative study between the Brazilian and German federal governments 
            in terms of Knowledge Management and Organizational Intelligence.
          </p>
          
          <p className="text-lg text-white/70 mb-8 max-w-3xl mx-auto">
            As an undergraduate and graduate professor, Dr. De Angelis has taught at both private and public universities, 
            including Unisul and UFSC in Florianópolis, Santa Catarina, Brazil.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="glass-card p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <BookOpen className="h-8 w-8 text-primary-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-white/70">Publications</div>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Globe className="h-8 w-8 text-primary-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-white/70">Countries</div>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Users className="h-8 w-8 text-primary-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">5</div>
              <div className="text-white/70">Continents</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Research Filters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Continents */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Research by Continents</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {continents.map((continent) => (
                <Button
                  key={continent.name}
                  variant="outline"
                  className="glass-card h-auto p-4 flex flex-col items-center space-y-2 hover:bg-white/10 border-white/20"
                  onClick={() => window.location.href = `/research?continente=${encodeURIComponent(continent.name)}`}
                >
                  <continent.icon className="h-6 w-6 text-primary-300" />
                  <span className="text-sm text-white">{continent.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Research by Specialty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant="outline"
                  className="glass-card p-4 hover:bg-white/10 border-white/20 text-white"
                  onClick={() => window.location.href = `/research?especialidad=${encodeURIComponent(specialty)}`}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Research by Countries</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {countries.map((country) => (
                <Button
                  key={country}
                  variant="ghost"
                  className="filter-tag"
                  onClick={() => window.location.href = `/research?pais=${encodeURIComponent(country)}`}
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </div>
    </section>
  )
}