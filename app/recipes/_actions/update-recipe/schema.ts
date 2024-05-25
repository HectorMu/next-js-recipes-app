import { z } from 'zod'

export const UpdateRecipeSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional()
})
