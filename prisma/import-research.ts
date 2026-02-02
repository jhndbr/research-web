import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface ResearchPaper {
  title: string
  url: string
  abstract: string
  continent: string
  country: string
  specialty: string
}

// Mapeo de continentes
const continentMap: { [key: string]: string } = {
  'South America': 'América del Sur',
  'Asia': 'Asia',
  'Europe': 'Europa',
  'North America': 'América del Norte',
  'Africa': 'África',
  'Oceanía': 'Oceanía',
}

// Mapeo de especialidades basado en el contenido de las investigaciones
const specialtyMap: { [key: string]: string } = {
  'knowledge': 'Gestión del Conocimiento',
  'innovation': 'Innovación y Desarrollo',
  'governance': 'Gobernanza y Administración Pública',
  'environment': 'Desarrollo Sustentable',
  'education': 'Educación y Participación Social',
  'intelligence': 'Inteligencia Organizacional',
  'agriculture': 'Agricultura e Hidrología',
  'default': 'Gestión del Conocimiento',
}

function determineSpecialty(title: string, abstract: string): string {
  const text = (title + ' ' + abstract).toLowerCase()
  
  if (text.includes('agricultur') || text.includes('hydro')) {
    return specialtyMap['agriculture']
  }
  if (text.includes('educa') || text.includes('participac')) {
    return specialtyMap['education']
  }
  if (text.includes('ambient') || text.includes('sustent') || text.includes('environment')) {
    return specialtyMap['environment']
  }
  if (text.includes('innova')) {
    return specialtyMap['innovation']
  }
  if (text.includes('governan') || text.includes('gobern') || text.includes('public')) {
    return specialtyMap['governance']
  }
  if (text.includes('intelligen') || text.includes('inteligên')) {
    return specialtyMap['intelligence']
  }
  if (text.includes('knowledge') || text.includes('conhecimento')) {
    return specialtyMap['knowledge']
  }
  
  return specialtyMap['default']
}

function parseMarkdown(content: string): ResearchPaper[] {
  const papers: ResearchPaper[] = []
  
  // Dividir el contenido en líneas
  const lines = content.split('\n')
  
  let currentContinent = ''
  let currentCountry = ''
  let currentTitle = ''
  let currentUrl = ''
  let currentAbstract = ''
  let isReadingAbstract = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Detectar continente (## South America, ## Asia, etc.)
    if (line.startsWith('## ')) {
      const header = line.replace(/^##\s+/, '').trim()
      
      if (header === 'South America') {
        currentContinent = continentMap['South America']
      } else if (header === 'Asia') {
        currentContinent = continentMap['Asia']
      } else if (header === 'Europe') {
        currentContinent = continentMap['Europe']
      } else if (header === 'North America') {
        currentContinent = continentMap['North America']
      } else if (header === 'Africa') {
        currentContinent = continentMap['Africa']
      } else if (header.includes('Agriculture') || header.includes('Hydrology')) {
        currentContinent = 'Global'
      }
      continue
    }
    
    // Detectar país (### Brazil, ### Chile, etc.)
    if (line.startsWith('### ')) {
      currentCountry = line.replace(/^###\s+/, '').trim()
      continue
    }
    
    // Detectar título del paper (#### Título)
    if (line.startsWith('#### ')) {
      // Guardar el paper anterior si existe
      if (currentTitle && currentUrl && currentAbstract) {
        papers.push({
          title: currentTitle,
          url: currentUrl,
          abstract: currentAbstract.trim(),
          continent: currentContinent,
          country: currentCountry || currentContinent,
          specialty: determineSpecialty(currentTitle, currentAbstract),
        })
      }
      
      // Empezar nuevo paper
      currentTitle = line.replace(/^####\s+/, '').trim()
      currentUrl = ''
      currentAbstract = ''
      isReadingAbstract = false
      continue
    }
    
    // Detectar URL
    if (line.startsWith('**URL:**')) {
      currentUrl = line.replace('**URL:**', '').trim()
      continue
    }
    
    // Detectar Abstract
    if (line.startsWith('**Abstract:**')) {
      currentAbstract = line.replace('**Abstract:**', '').trim()
      isReadingAbstract = true
      continue
    }
    
    // Continuar leyendo el abstract
    if (isReadingAbstract && line && !line.startsWith('---') && !line.startsWith('**') && !line.startsWith('##')) {
      currentAbstract += ' ' + line
      continue
    }
    
    // Terminar de leer abstract si encontramos separador
    if (line.startsWith('---')) {
      isReadingAbstract = false
      continue
    }
  }
  
  // Guardar el último paper
  if (currentTitle && currentUrl && currentAbstract) {
    papers.push({
      title: currentTitle,
      url: currentUrl,
      abstract: currentAbstract.trim(),
      continent: currentContinent,
      country: currentCountry || currentContinent,
      specialty: determineSpecialty(currentTitle, currentAbstract),
    })
  }
  
  return papers
}

async function importResearchPapers() {
  console.log('🚀 Starting import from research_document.md...')
  
  try {
    // Leer el archivo markdown
    const filePath = path.join(process.cwd(), 'public', 'images', 'research_document.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Parsear el contenido
    const papers = parseMarkdown(content)
    console.log(`📄 Found ${papers.length} research papers to import`)
    
    // Obtener el usuario admin para asignar como autor
    const adminUser = await prisma.user.findFirst({
      where: {
        email: 'admin@cristianodeangelis.com',
      },
    })
    
    if (!adminUser) {
      throw new Error('Admin user not found. Please run the seed script first.')
    }
    
    // Limpiar papers existentes (opcional)
    const deleteCount = await prisma.researchPaper.deleteMany({
      where: {
        authorId: adminUser.id,
      },
    })
    console.log(`🗑️  Deleted ${deleteCount.count} existing papers`)
    
    // Insertar los nuevos papers
    let successCount = 0
    let errorCount = 0
    
    for (const paper of papers) {
      try {
        // Generar slug desde el título
        const slug = paper.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remover acentos
          .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
          .replace(/\s+/g, '-') // Reemplazar espacios con guiones
          .replace(/-+/g, '-') // Remover guiones múltiples
          .substring(0, 100) // Limitar longitud
        
        await prisma.researchPaper.create({
          data: {
            title: paper.title,
            description: paper.abstract,
            url: paper.url,
            continent: paper.continent,
            country: paper.country,
            specialty: paper.specialty,
            slug: slug,
            published: true,
            authorId: adminUser.id,
            publishedAt: new Date(),
          },
        })
        successCount++
      } catch (error) {
        console.error(`❌ Error importing paper: ${paper.title}`)
        console.error(error)
        errorCount++
      }
    }
    
    console.log(`\n✅ Import completed!`)
    console.log(`   - Successfully imported: ${successCount} papers`)
    console.log(`   - Errors: ${errorCount} papers`)
    
    // Mostrar estadísticas por continente
    const stats = await prisma.researchPaper.groupBy({
      by: ['continent'],
      _count: true,
    })
    
    console.log('\n📊 Papers by continent:')
    stats.forEach(stat => {
      console.log(`   - ${stat.continent}: ${stat._count} papers`)
    })
    
  } catch (error) {
    console.error('❌ Error during import:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar el script
importResearchPapers()
  .then(() => {
    console.log('\n✨ Import process finished successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Import process failed:', error)
    process.exit(1)
  })
