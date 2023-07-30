import { Employee } from '../models'

export interface AddEmployees {
  add(param: Employee): Promise<AddEmployeesResult>
}

export type AddEmployeesResult = Employee
