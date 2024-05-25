'use server'
import { db } from '@/lib/db'
import { auth } from '@/lib/nextauth'

export const getUserRecipeById = async (recipeId: number) => {
  const session = await auth()

  if (!session) throw new Error('Unauthorized')

  const recipe = await db.userRecipe.findFirst({
    where: {
      userId: {
        equals: Number(session.user.id)
      },
      id: { equals: recipeId }
    }
  })

  return recipe
}
