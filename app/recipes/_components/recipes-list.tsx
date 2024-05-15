import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { delay } from '@/lib/delay'
import { auth } from '@/lib/nextauth'

export async function RecipesList() {
  const session = await auth()

  if (!session) return null

  const recipes = await db.userRecipe.findMany({
    where: {
      userId: {
        equals: Number(session.user.id)
      }
    }
  })

  await delay(2000)
  return (
    <div>
      {recipes.map((item) => {
        return <p key={item.id}>{item.id}</p>
      })}
    </div>
  )
}

export const RecipesListSkeleton = () => <Skeleton className="h-10 w-full" />
