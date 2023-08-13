import { Uploader } from '@/app/data/protocols/services'
import { Employee } from '../../models'

export interface UpdateEmployee {
	update(
		param: Employee,
		uploader?: Uploader
	): Promise<Employee | 'notFound' | 'emailInUse' | 'documentInUse'>
}
