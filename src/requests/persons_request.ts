import {z} from 'zod';
import {PersonSchema} from '../models/person';

export const CreatePersonRequestSchema = PersonSchema.omit({id: true});
export const GetPersonRequestSchema = PersonSchema;
export const UpdatePersonRequestSchema = PersonSchema.partial().omit({id: true});
export type UpdatePersonRequest = z.infer<typeof UpdatePersonRequestSchema>;
