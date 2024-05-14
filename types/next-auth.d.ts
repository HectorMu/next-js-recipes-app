import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email?: string | null | undefined
      userName?: string | null | undefined
      firstName?: string | null | undefined
      lastName?: string | null | undefined
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    userName?: string | null | undefined
    firstName?: string | null | undefined
    lastName?: string | null | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    email?: string | null | undefined
    userName?: string | null | undefined
    firstName?: string | null | undefined
    lastName?: string | null | undefined
  }
}
