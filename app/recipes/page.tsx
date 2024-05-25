import { RecipesList } from './_components/recipes-list'
import { AddRecipeSheet } from './_components/add-recipe-sheet'
import { UpdateRecipeSheet } from './_components/update-recipe-sheet'

export default function RecipesPage() {
  return (
    <>
      <UpdateRecipeSheet />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-5">My recipes</h1>
        <AddRecipeSheet />
      </div>
      <RecipesList />
    </>
  )
}
