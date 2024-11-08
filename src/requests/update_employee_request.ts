import {Employee} from '../models/employee';

export interface UpdateEmployeeRequest extends Partial<Employee> {}
