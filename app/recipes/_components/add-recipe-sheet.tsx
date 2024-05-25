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
import { useOpenRecipe } from '../_hooks/useOpenRecipe'
import { useRouter } from 'next/navigation'

export const AddRecipeSheet = () => {
  const { isOpen, setOpen } = useOpenRecipe()
  const router = useRouter()

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus /> Add recipe
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new recipe</SheetTitle>
          <SheetHeader>You will add a new recipe to your list!</SheetHeader>
          <RecipeForm
            onSubmit={(recipe) => {
              setOpen(false)
              router.push(`/recipes/${recipe.id}`)
            }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
