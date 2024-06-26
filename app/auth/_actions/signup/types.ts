import { ActionState } from '@/lib/create-safe-action'

import { SignupSchema } from './schema'
import { z } from 'zod'

export type InputType = z.infer<typeof SignupSchema>

export type SignupPayload = InputType

export type ReturnType = ActionState<InputType, null>
