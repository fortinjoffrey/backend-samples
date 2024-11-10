import {PersonSchema} from '../models/person';

export const CreatePersonRequestSchema = PersonSchema.omit({id: true});
export const UpdatePersonRequestSchema = PersonSchema.partial();
