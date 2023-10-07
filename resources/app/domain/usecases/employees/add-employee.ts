import { EmployeeModel } from '@/domain/models'

export interface AddEmployee {
	add(param: EmployeeModel): Promise<AddEmployeesResult>
}

export type AddEmployeesResult = EmployeeModel
