import { CustomerModel } from '@/domain/models'

export interface LoadCustomers {
	load(): Promise<LoadCustomersResult>
}

export type LoadCustomersResult = CustomerModel[]
