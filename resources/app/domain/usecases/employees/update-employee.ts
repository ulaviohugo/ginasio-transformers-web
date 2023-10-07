import { EmployeeModel } from '@/domain/models'

export interface UpdateEmployee {
	update(param: EmployeeModel): Promise<EmployeeModel>
}
