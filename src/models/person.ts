import {WithId} from './with_id';

export interface Person extends WithId {
  name: string;
  age: number;
  /** @format date-time */
  dateOfBirth: string;
  car: {
    name: string;
    /** @format date-time */
    dateOfManufacturing: string;
  };
}
