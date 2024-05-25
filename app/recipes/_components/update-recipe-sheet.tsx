'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import React from 'react'
import { RecipeForm } from './recipe-form'
import { useEditRecipeSheet, useOpenRecipe } from '../_hooks/useOpenRecipe'
import { useRouter } from 'next/navigation'
import { getUserRecipeById } from '../_actions/get-user-recipe-by-id'
import { useQuery } from '@tanstack/react-query'

export const UpdateRecipeSheet = () => {
  const { isOpen, id: recipeId, setClose } = useEditRecipeSheet()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getUserRecipeById(Number(recipeId)),
    enabled: Boolean(recipeId)
  })

  return (
    <Sheet open={isOpen} onOpenChange={setClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit recipe</SheetTitle>
          <SheetHeader>Made changes to the recipe</SheetHeader>
          <RecipeForm
            initialData={data}
            onSubmit={(recipe) => {
              setClose()
            }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
