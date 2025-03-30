import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().describe('The email of the user'),
  name: z.string().min(1),
  createdAt: z.date(),
})

export const CreateUserSchema = UserSchema.omit({ createdAt: true })

// Type inféré à partir du schéma
export type User = z.infer<typeof UserSchema>
