import { Uploader } from '@/data/protocols/services'
import { EmployeeModel } from '@/domain/models'

export interface UpdateEmployee {
	update(
		param: EmployeeModel,
		uploader?: Uploader
	): Promise<EmployeeModel | 'notFound' | 'emailInUse' | 'documentInUse'>
}
