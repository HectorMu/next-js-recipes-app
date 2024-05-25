'use server'
import { db } from '@/lib/db'
import { auth } from '@/lib/nextauth'

export const getCurrentUserRecipes = async () => {
  const session = await auth()

  if (!session) throw new Error('Unauthorized')

  const recipes = await db.userRecipe.findMany({
    where: {
      userId: {
        equals: Number(session.user.id)
      }
    }
  })

  return recipes
}


export const createRecipe = async ()=>{}