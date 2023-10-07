import { CustomerModel } from '@/domain/models'

export interface AddCustomer {
	add(param: CustomerModel): Promise<AddCustomersResult>
}

export type AddCustomersResult = CustomerModel
