import { Uploader } from '@/data/protocols/services'
import { EmployeeModel } from '@/domain/models'

export interface AddEmployee {
	add(param: EmployeeModel, uploader?: Uploader): Promise<AddEmployeesResult>
}

export type AddEmployeesResult = EmployeeModel | 'emailInUse' | 'documentInUse'
