'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUserRecipeById } from '../_actions/get-user-recipe-by-id'
import { useParams } from 'next/navigation'
import { RecipeForm } from '../_components/recipe-form'

export default function RecipePage() {
  const params = useParams<{ recipeId: string }>()

  const { data, isPending } = useQuery({
    queryKey: ['recipe', params.recipeId],
    queryFn: () => getUserRecipeById(Number(params.recipeId)),
    enabled: Boolean(params.recipeId)
  })

  return (
    <div>{isPending ? 'Loading...' : <RecipeForm initialData={data} />}</div>
  )
}
