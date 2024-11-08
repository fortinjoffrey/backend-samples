import {WithId} from './with_id';

export interface Employee extends WithId {
  id: string;
  name: string;
  age: number;
}
