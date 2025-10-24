import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { ResearchPreview } from '@/components/research-preview'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ResearchPreview />
      <Footer />
    </main>
  )
}