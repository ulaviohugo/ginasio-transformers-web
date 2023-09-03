import { Uploader } from '@/app/data/protocols/services'
import { CustomerModel } from '../../models'

export interface AddCustomer {
	add(param: CustomerModel, uploader?: Uploader): Promise<AddCustomersResult>
}

export type AddCustomersResult = CustomerModel | 'emailInUse'
