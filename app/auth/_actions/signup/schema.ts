import { z } from 'zod'

export const SignupSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    userName: z.string(),
    password: z.string(),
    confirmPassword: z.string()
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      path: ['password'],
      message: 'Las contraseñas no coinciden'
    }
  )
