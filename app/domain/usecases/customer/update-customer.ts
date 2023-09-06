import { Uploader } from '@/data/protocols/services'
import { CustomerModel } from '@/domain/models'

export interface UpdateCustomer {
	update(
		param: CustomerModel,
		uploader?: Uploader
	): Promise<CustomerModel | 'notFound' | 'emailInUse'>
}
