import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Fetch user role from database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { role: true }
        })
        token.role = dbUser?.role || 'USER'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }