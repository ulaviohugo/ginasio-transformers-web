import { Employee } from '../models'

export interface LoadEmployees {
  load(): Promise<LoadEmployeesResult>
}

export type LoadEmployeesResult = Employee[]
