import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/auth/signup', '/', '/auth/login']

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const isAuthorized = Boolean(token)

      if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) return true

      return isAuthorized
    }
  },
  pages: {
    signIn: '/auth/login'
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)']
}
