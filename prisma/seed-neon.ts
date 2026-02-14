import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Connect directly to Neon
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_bGUTxzZr39BY@ep-floral-thunder-acz43d3w-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
    }
  }
})

async function main() {
  const email = 'cristiano@admin.com'
  const password = 'admin123'
  const hashed = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role: 'ADMIN' },
    create: {
      email,
      name: 'Cristiano De Angelis',
      password: hashed,
      role: 'ADMIN',
    },
  })

  console.log(`✅ Admin en Neon: ${user.email} | role: ${user.role} | has password: ${!!user.password}`)

  // Also list all users
  const users = await prisma.user.findMany({ select: { email: true, role: true, password: true } })
  console.log('Usuarios en Neon:')
  users.forEach(u => console.log(`  - ${u.email} | role: ${u.role} | has password: ${!!u.password}`))
}

main().finally(() => prisma.$disconnect())
