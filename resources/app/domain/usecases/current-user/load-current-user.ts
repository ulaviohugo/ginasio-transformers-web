import { EmployeeModel } from '@/domain/models'

export interface LoadCurrentUser {
	load(id: number): Promise<EmployeeModel>
}
