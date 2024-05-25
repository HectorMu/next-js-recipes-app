import { z } from 'zod'

export const CreateRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  isPublic: z.boolean()
})
