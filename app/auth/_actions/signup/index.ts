'use server'

import { db } from '@/lib/db'
import { InputType, ReturnType } from './types'
import { hashPassword } from '@/lib/bcryptjs'
import { createSafeAction } from '@/lib/create-safe-action'
import { SignupSchema } from './schema'
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  let user: User
  try {
    const hashedPassword = await hashPassword(data.password)

    const { confirmPassword, ...restOfUser } = data

    user = await db.user.create({
      data: {
        ...restOfUser,
        password: hashedPassword
      }
    })
  } catch (error) {
    return { error: 'Internal server error' }
  }

  redirect('/auth/login')
}

export const signupAction = createSafeAction(SignupSchema, handler)
