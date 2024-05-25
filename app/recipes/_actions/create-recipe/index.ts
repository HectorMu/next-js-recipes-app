'use server'

import { db } from '@/lib/db'
import { CreateRecipePayload, ReturnType } from './types'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateRecipeSchema } from './schema'
import { UserRecipe } from '@prisma/client'
import { auth } from '@/lib/nextauth'

const handler = async (data: CreateRecipePayload): Promise<ReturnType> => {
  let recipe: UserRecipe
  try {
    const session = await auth()

    if (!session) throw new Error('Unauthorized')

    recipe = await db.userRecipe.create({
      data: { ...data, userId: Number(session.user.id) }
    })
  } catch (error) {
    return { error: 'Internal server error' }
  }
  return { data: recipe }
}

export const createRecipeAction = createSafeAction(CreateRecipeSchema, handler)
