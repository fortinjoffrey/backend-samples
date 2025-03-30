import { z } from 'zod'

// Cette fonction va déclencher une erreur car pas de type de retour explicite
// const validateEmail = (email: string) => {
//   return email.includes('@')
// }

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().describe('The email of the user'),
  name: z.string().min(1),
  createdAt: z.date(),
})

console.log('User schema initialized')

export const CreateUserSchema = UserSchema.omit({ createdAt: true })

// Type inféré à partir du schéma
export type User = z.infer<typeof UserSchema>
