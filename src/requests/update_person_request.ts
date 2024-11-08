import {Person} from '../models/person';

export interface UpdatePersonRequest extends Partial<Person> {}
