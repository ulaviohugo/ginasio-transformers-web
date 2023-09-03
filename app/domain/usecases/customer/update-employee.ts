import { Uploader } from '@/app/data/protocols/services'
import { EmployeeModel } from '../../models'

export interface UpdateEmployee {
	update(
		param: EmployeeModel,
		uploader?: Uploader
	): Promise<EmployeeModel | 'notFound' | 'emailInUse' | 'documentInUse'>
}
