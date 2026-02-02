import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Book {
  title: string
  description: string
  country: string
  language: string
  publisher: string
  year?: number
  purchaseUrl: string
  imageUrl?: string
}

const books: Book[] = [
  {
    title: 'A Knowledge Management and Organizational Intelligence Model for Public Sector Administrations',
    description: 'This book presents a comprehensive framework for implementing knowledge management and organizational intelligence practices in public sector organizations. The work explores how public administrations can leverage knowledge assets to improve decision-making, enhance service delivery, and increase organizational effectiveness. Key topics include Knowledge Management in Public Administration, Organizational Intelligence Models, Public Sector Innovation, Information Systems Integration, and Strategic Decision-Making.',
    country: 'England',
    language: 'en',
    publisher: 'Academic Bookshop',
    purchaseUrl: 'https://www.academic-bookshop.com/ourshop/prod_2664821-A-KM-Organisational-Intelligence-Model-for-Public-Sector-Administrations-by-Dr-Cristiano-Trindade-De-Angelis.html',
    imageUrl: '/images/book1.jpg',
  },
  {
    title: 'Gestão por Inteligências',
    description: 'Gestão por Inteligências (Management by Intelligences) presents an innovative approach to organizational management that integrates multiple forms of intelligence - rational, emotional, cultural, and spiritual - to enhance organizational performance and decision-making. Key topics include Integrated Intelligence Management, Organizational Development, Leadership and Decision-Making, Knowledge Management Practices, and Cultural and Emotional Intelligence.',
    country: 'Portugal',
    language: 'pt',
    publisher: 'Atlantic Bookshop',
    year: 2016,
    purchaseUrl: 'https://www.atlanticbookshop.pt/compendium/gestao-por-inteligencias',
    imageUrl: '/images/book2.jpg',
  },
  {
    title: 'Gestión por Inteligencias (Spanish Edition)',
    description: 'This Spanish edition brings the concepts of Management by Intelligences to Spanish-speaking audiences. The book explores how organizations can develop and integrate different types of intelligence to solve complex problems, improve governance, and achieve sustainable development. Key topics include Management by Intelligences, Organizational Intelligence, Public and Private Sector Management, Cultural Intelligence, and Knowledge-Based Decision Making.',
    country: 'Spain',
    language: 'es',
    publisher: 'Amazon',
    purchaseUrl: 'https://www.amazon.co.uk/Gesti%C3%B3n-Inteligencias-Spanish-Cristiano-Trindade-ebook/dp/B01AYEPRPY',
    imageUrl: '/images/book3.jpg',
  },
]

async function importBooks() {
  console.log('📚 Starting books import...')
  
  try {
    // Obtener el usuario admin
    const adminUser = await prisma.user.findFirst({
      where: {
        email: 'admin@cristianodeangelis.com',
      },
    })
    
    if (!adminUser) {
      throw new Error('Admin user not found. Please run the seed script first.')
    }
    
    // Limpiar libros existentes (opcional)
    const deleteCount = await prisma.book.deleteMany({
      where: {
        authorId: adminUser.id,
      },
    })
    console.log(`🗑️  Deleted ${deleteCount.count} existing books`)
    
    // Insertar los nuevos libros
    let successCount = 0
    let errorCount = 0
    
    for (const book of books) {
      try {
        // Generar slug desde el título
        const slug = book.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remover acentos
          .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
          .replace(/\s+/g, '-') // Reemplazar espacios con guiones
          .replace(/-+/g, '-') // Remover guiones múltiples
          .substring(0, 100) // Limitar longitud
        
        await prisma.book.create({
          data: {
            title: book.title,
            description: book.description,
            country: book.country,
            language: book.language,
            publisher: book.publisher,
            year: book.year,
            purchaseUrl: book.purchaseUrl,
            imageUrl: book.imageUrl,
            slug: slug,
            published: true,
            authorId: adminUser.id,
            publishedAt: new Date(),
          },
        })
        console.log(`✅ Imported: ${book.title}`)
        successCount++
      } catch (error) {
        console.error(`❌ Error importing book: ${book.title}`)
        console.error(error)
        errorCount++
      }
    }
    
    console.log(`\n✅ Import completed!`)
    console.log(`   - Successfully imported: ${successCount} books`)
    console.log(`   - Errors: ${errorCount} books`)
    
  } catch (error) {
    console.error('❌ Error during import:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar el script
importBooks()
  .then(() => {
    console.log('\n✨ Books import process finished successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Books import process failed:', error)
    process.exit(1)
  })
