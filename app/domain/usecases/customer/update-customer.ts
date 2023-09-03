import { Uploader } from '@/app/data/protocols/services'
import { CustomerModel } from '../../models'

export interface UpdateCustomer {
	update(
		param: CustomerModel,
		uploader?: Uploader
	): Promise<CustomerModel | 'notFound' | 'emailInUse'>
}
