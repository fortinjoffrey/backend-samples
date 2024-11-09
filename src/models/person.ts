import {z} from 'zod';
import {CarSchema} from './car';
import {GenderSchema} from './gender';

export const PersonSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    age: z.coerce.number().min(0),
    dateOfBirth: z.string().datetime(),
    car: z.array(CarSchema),
    gender: GenderSchema,
    pseudo: z.string().optional(),
  })
  .strict();

export type Person = z.infer<typeof PersonSchema>;
