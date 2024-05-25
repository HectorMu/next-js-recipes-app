import { ActionState } from '@/lib/create-safe-action'

import { CreateRecipeSchema } from './schema'
import { z } from 'zod'
import { UserRecipe } from '@prisma/client'

export type CreateRecipePayload = z.infer<typeof CreateRecipeSchema>

export type ReturnType = ActionState<CreateRecipePayload, UserRecipe>
