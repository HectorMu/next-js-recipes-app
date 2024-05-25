'use client'
import { createRecipeAction } from '../_actions/create-recipe'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserRecipe } from '@prisma/client'
import { updateRecipeAction } from '../_actions/update-recipe'

interface Props {
  initialData?: Partial<UserRecipe> | null
  onSubmit?: (data: UserRecipe) => void
}

export const RecipeForm = ({ initialData, onSubmit }: Props) => {
  const queryClient = useQueryClient()

  const isEditing = Boolean(initialData?.id)

  const { mutate: createRecipe, isPending: isSaving } = useMutation({
    mutationFn: createRecipeAction,
    onSuccess: ({ data }) => {
      toast.success('Recipe created')
      queryClient.invalidateQueries({ queryKey: ['current-user-recipes'] })
      data && onSubmit?.(data)
    }
  })

  const { mutate: updateRecipe, isPending: isSavingEdit } = useMutation({
    mutationFn: updateRecipeAction,
    onSuccess: ({ data }) => {
      toast.success('Recipe updated')
      queryClient.invalidateQueries({ queryKey: ['current-user-recipes'] })
      data && onSubmit?.(data)
    }
  })

  const isLoading = isSavingEdit || isSaving

  const handleSubmit = (formData: FormData) => {
    const values = {
      title: formData.get('title')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      isPublic: Boolean(formData.get('isPublic') ?? false)
    }

    if (isEditing && initialData?.id) {
      updateRecipe({ id: initialData?.id, ...values })
    } else {
      createRecipe(values)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 items-end">
      <Input
        defaultValue={initialData?.title}
        name="title"
        placeholder="Ex. lemon pay"
      />
      <Input
        defaultValue={initialData?.description}
        name="description"
        placeholder="Ex. delicious lemon pay made with love"
      />
      {/* <div className="flex self-start items-center space-x-2 ">
        <Checkbox
          defaultChecked={initialData?.isPublic}
          id="make-public"
          name="isPublic"
        />
        <label
          htmlFor="make-public"
          className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Make recipe public
        </label>
      </div> */}
      <Button disabled={isLoading} type="submit">
        {isLoading ? 'Saving...' : isEditing ? 'Save changes' : 'Save recipe'}
      </Button>
    </form>
  )
}
