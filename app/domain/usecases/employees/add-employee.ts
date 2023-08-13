import { Uploader } from '@/app/data/protocols/services'
import { Employee } from '../../models'

export interface AddEmployee {
	add(param: Employee, uploader?: Uploader): Promise<AddEmployeesResult>
}

export type AddEmployeesResult = Employee | 'emailInUse' | 'documentInUse'
