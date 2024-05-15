import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'
import { matchPassword } from './bcryptjs'
import { supabaseJWTSecret } from '@/env'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@email.com'
        },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials?.email
          }
        })

        if (!user) {
          return null
        }

        const passwordsMatch = await matchPassword(
          credentials.password,
          user.password
        )

        if (!passwordsMatch) {
          return null
        }

        const { id, password, createdAt, updatedAt, ...restOfUser } = user

        return {
          id: String(id),
          ...restOfUser
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.firstName = user.firstName
        token.userName = user.userName
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.firstName = token.firstName
      session.user.lastName = token.lastName
      session.user.userName = token.userName
      return session
    }
  }
}

export const auth = async () => {
  const session = await getServerSession(authOptions)
  return session
}
