import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, password: true }
  })
  users.forEach(u => {
    console.log(`- ${u.email} | role: ${u.role} | has password: ${!!u.password}`)
  })
}

main().finally(() => prisma.$disconnect())
