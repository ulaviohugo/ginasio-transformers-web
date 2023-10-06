import { EmployeeModel } from '@/domain/models'

export interface LoadEmployees {
	load(): Promise<LoadEmployeesResult>
}

export type LoadEmployeesResult = EmployeeModel[]
