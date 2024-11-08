import {Person} from '../models/person';

export interface CreatePersonRequest extends Omit<Person, 'id'> {}
