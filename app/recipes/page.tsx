import React, { Suspense } from 'react'
import { RecipesList, RecipesListSkeleton } from './_components/recipes-list'
import { RecipeForm } from './_components/recipe-form'

export default function RecipesPage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My recipes</h1>
        <RecipeForm />
      </div>

      <Suspense fallback={<RecipesListSkeleton />}>
        <RecipesList />
      </Suspense>
    </>
  )
}
