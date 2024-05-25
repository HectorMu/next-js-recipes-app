'use server'

import { db } from '@/lib/db'
import { UpdateRecipePayload, ReturnType } from './types'
import { createSafeAction } from '@/lib/create-safe-action'
import { UpdateRecipeSchema } from './schema'
import { UserRecipe } from '@prisma/client'
import { auth } from '@/lib/nextauth'

const handler = async (data: UpdateRecipePayload): Promise<ReturnType> => {
  let recipe: UserRecipe
  try {
    const session = await auth()

    if (!session) throw new Error('Unauthorized')

    const { id, ...restOfData } = data

    recipe = await db.userRecipe.update({
      data: { ...restOfData },
      where: { id }
    })
  } catch (error) {
    return { error: 'Internal server error' }
  }
  return { data: recipe }
}

export const updateRecipeAction = createSafeAction(UpdateRecipeSchema, handler)
