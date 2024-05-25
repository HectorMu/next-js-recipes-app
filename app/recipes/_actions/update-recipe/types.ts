import { ActionState } from '@/lib/create-safe-action'

import { UpdateRecipeSchema } from './schema'
import { z } from 'zod'
import { UserRecipe } from '@prisma/client'

export type UpdateRecipePayload = z.infer<typeof UpdateRecipeSchema>

export type ReturnType = ActionState<UpdateRecipePayload, UserRecipe>
