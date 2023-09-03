import { CustomerModel } from '../../models'

export interface LoadCustomers {
	load(): Promise<LoadCustomersResult>
}

export type LoadCustomersResult = CustomerModel[]
