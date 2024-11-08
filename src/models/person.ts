import {z} from 'zod';

export const PersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.coerce.number().min(0),
  dateOfBirth: z.string().datetime(),
  car: z.object({
    name: z.string(),
    dateOfManufacturing: z.string().datetime(),
  }),
});

export type Person = z.infer<typeof PersonSchema>;
