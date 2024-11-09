import {z} from 'zod';

export const CarSchema = z
  .object({
    name: z.string(),
    dateOfManufacturing: z.string().datetime(),
  })
  .strict();
