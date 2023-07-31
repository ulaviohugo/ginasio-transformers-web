import { Employee } from '../models'

export interface AddEmployee {
  add(param: Employee): Promise<AddEmployeesResult>
}

export type AddEmployeesResult = Employee
