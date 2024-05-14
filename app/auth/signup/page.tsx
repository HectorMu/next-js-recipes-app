'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useServerAction } from '@/hooks/useServerAction'
import { signupAction } from '../_actions/signup'
import { SignupPayload } from '../_actions/signup/types'
import { toast } from 'sonner'

export default function SignupPage() {
  const { execute, isLoading } = useServerAction(signupAction, {
    onComplete: () => {
      toast.success('Registered')
    }
  })

  const onSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData) as SignupPayload
    execute(data)
  }
  return (
    <div className="flex  w-full items-center justify-center ">
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create your account to get started.
          </p>
        </div>
        <form action={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                name="firstName"
                id="first-name"
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                name="lastName"
                id="last-name"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="userName"
              id="username"
              placeholder="johndoe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" required type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              name="confirmPassword"
              id="confirm-password"
              required
              type="password"
            />
          </div>
          <Button disabled={isLoading} className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
        <Separator />
        <Button asChild className="w-full" type="submit">
          <Link href={'/auth/login'}>Log in</Link>
        </Button>
      </div>
    </div>
  )
}
