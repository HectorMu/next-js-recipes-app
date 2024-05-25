'use client'
import { Skeleton } from '@/components/ui/skeleton'

import useCurrentUserRecipes from '../_hooks/useCurrentUserRecipes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEditRecipeSheet } from '../_hooks/useOpenRecipe'

export function RecipesList() {
  const { data: recipes, isPending } = useCurrentUserRecipes()
  const setOpen = useEditRecipeSheet((selector) => selector.setOpen)

  if (isPending) return <RecipesListSkeleton />

  return (
    <div className="grid grid-cols-2 gap-5">
      {recipes?.map((item) => {
        return (
          <Card onClick={() => setOpen(item.id)} key={item.id}>
            <CardHeader className="p-3">
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-3">{item.description}</CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export const RecipesListSkeleton = () => (
  <Skeleton className="h-10 w-full mt-5" />
)

export const RecipesListError = () => <h1>Error</h1>
