import { CustomerModel } from '@/domain/models'

export interface UpdateCustomer {
	update(param: CustomerModel): Promise<CustomerModel>
}
