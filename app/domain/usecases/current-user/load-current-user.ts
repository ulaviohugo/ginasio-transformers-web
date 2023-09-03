import { EmployeeModel } from '../../models'

export interface LoadCurrentUser {
	load(id: number): Promise<EmployeeModel>
}
