/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXT_AUTH_SECRET
  }
}

export default nextConfig
