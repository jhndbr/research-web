import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cristianodeangelis.com' },
    update: {},
    create: {
      email: 'admin@cristianodeangelis.com',
      name: 'Dr. Cristiano De Angelis',
      role: 'ADMIN',
      image: '/images/dr_cristiano.jpg'
    },
  })

  console.log('👤 Created admin user:', adminUser.email)

  // Seed research papers with the migrated data
  const researchPapers = [
    {
      title: "Influence of Lactobacillus Supplementation on the Immune System and Intestinal Microbiota of Broiler Chickens Challenged with Salmonella Enteritidis",
      description: "Investigación sobre los efectos de la suplementación con Lactobacillus en el sistema inmunitario y la microbiota intestinal de pollos de engorde desafiados con Salmonella Enteritidis. El estudio evalúa la capacidad de los probióticos para mejorar la respuesta inmune y mantener el equilibrio de la microbiota intestinal ante infecciones bacterianas.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8955847/",
      continent: "América del Norte",
      specialty: "Microbiología Veterinaria",
      country: "Estados Unidos",
      slug: "lactobacillus-supplementation-broiler-chickens",
      keywords: ["lactobacillus", "probiotics", "broiler chickens", "salmonella", "microbiota"],
      authorId: adminUser.id
    },
    {
      title: "Effects of Dietary Supplementation with Probiotics on Growth Performance and Intestinal Health in Weaned Piglets",
      description: "Estudio que analiza los efectos de la suplementación dietética con probióticos en el rendimiento de crecimiento y la salud intestinal de lechones destetados. La investigación se centra en cómo los probióticos pueden mitigar el estrés del destete y promover un desarrollo intestinal saludable.",
      url: "https://www.sciencedirect.com/science/article/pii/S1756464621001018",
      continent: "Europa",
      specialty: "Nutrición Animal",
      country: "Reino Unido",
      slug: "probiotics-weaned-piglets-growth",
      keywords: ["probiotics", "piglets", "nutrition", "growth performance"],
      authorId: adminUser.id
    },
    {
      title: "Comparative Analysis of Antibiotic Resistance Patterns in Dairy Cattle: A Multi-Farm Study",
      description: "Análisis comparativo de los patrones de resistencia a antibióticos en ganado lechero a través de múltiples granjas. Esta investigación examina la prevalencia de bacterias resistentes a antibióticos y evalúa las prácticas de manejo que pueden influir en el desarrollo de resistencia antimicrobiana.",
      url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/jam.15543",
      continent: "América del Norte",
      specialty: "Medicina Preventiva Veterinaria",
      country: "Canadá",
      slug: "antibiotic-resistance-dairy-cattle",
      keywords: ["antibiotic resistance", "dairy cattle", "veterinary medicine"],
      authorId: adminUser.id
    },
    {
      title: "Prevalencia de Parásitos Gastrointestinales en Ovinos de Pastoreo en Zonas Áridas de Chile",
      description: "Estudio epidemiológico sobre la prevalencia de parásitos gastrointestinales en ovinos bajo sistemas de pastoreo en las zonas áridas del norte de Chile. La investigación caracteriza las especies parasitarias presentes y evalúa factores de riesgo asociados a las infestaciones parasitarias en condiciones de aridez.",
      url: "https://scielo.conicyt.cl/scielo.php?script=sci_arttext&pid=S0301-732X2021000200045",
      continent: "América del Sur",
      specialty: "Parasitología Veterinaria",
      country: "Chile",
      slug: "parasitos-gastrointestinales-ovinos-chile",
      keywords: ["parasitología", "ovinos", "Chile", "zonas áridas"],
      authorId: adminUser.id
    }
  ]

  for (const paper of researchPapers) {
    await prisma.researchPaper.upsert({
      where: { slug: paper.slug },
      update: {},
      create: paper,
    })
  }

  console.log('📄 Created research papers')

  // Seed books
  const books = [
    {
      title: "A Knowledge Management and Organizational Intelligence Model for Public Sector Administrations",
      description: "A Knowledge Management and Organizational Intelligence Model for Public Sector Administrations.",
      imageUrl: "/images/book1.jpg",
      purchaseUrl: "https://www.academic-bookshop.com/ourshop/prod_2664821-A-KM-Organisational-Intelligence-Model-for-Public-Sector-Administrations-by-Dr-Cristiano-Trindade-De-Angelis.html",
      country: "United Kingdom",
      slug: "knowledge-management-organizational-intelligence",
      publisher: "Academic Publishing International",
      year: 2016,
      language: "en",
      authorId: adminUser.id
    },
    {
      title: "Gestão por Inteligências",
      description: "Gestão por Inteligências (2016) - A comprehensive guide to intelligence-based management in organizations.",
      imageUrl: "/images/book2.jpg",
      purchaseUrl: "https://www.atlanticbookshop.pt/compendium/gestao-por-inteligencias",
      country: "Portugal",
      slug: "gestao-por-inteligencias",
      publisher: "Atlantic Bookshop",
      year: 2016,
      language: "pt",
      authorId: adminUser.id
    },
    {
      title: "Gestión por Inteligencias (Spanish Edition)",
      description: "Gestión por Inteligencias (Spanish Edition) - Intelligence management principles adapted for Spanish-speaking audiences.",
      imageUrl: "/images/book3.jpg",
      purchaseUrl: "https://www.amazon.co.uk/Gesti%C3%B3n-Inteligencias-Spanish-Cristiano-Trindade-ebook/dp/B01AYEPRPY",
      country: "Spain",
      slug: "gestion-por-inteligencias-spanish",
      publisher: "Amazon",
      year: 2016,
      language: "es",
      authorId: adminUser.id
    }
  ]

  for (const book of books) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: {},
      create: book,
    })
  }

  console.log('📚 Created books')

  // Seed site settings
  const settings = [
    {
      key: 'site_title',
      value: 'Dr. Cristiano De Angelis - Academic Researcher',
      description: 'Main site title'
    },
    {
      key: 'site_description',
      value: 'Freelance researcher at Skema Business School, France. Expert in Knowledge Management, Organizational Intelligence, and Public Administration.',
      description: 'Site meta description'
    },
    {
      key: 'contact_email',
      value: 'contact@cristianodeangelis.com',
      description: 'Contact email for the site'
    },
    {
      key: 'profile_image',
      value: '/images/20190708_dr_cristiano.jpg',
      description: 'Main profile image URL'
    }
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('⚙️ Created site settings')

  console.log('✅ Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })