import { QueryParams } from '@/data/protocols'
import { CustomerModel } from '@/domain/models'

export interface LoadCustomers {
	load(params?: LoadCustomersParams): Promise<LoadCustomersResult>
}

export type LoadCustomersParams = QueryParams<CustomerFilterFields>
export type LoadCustomersResult = CustomerModel[]

export type CustomerFilterFields = {
	id?: number
	start_month_of_birth?: string
	end_month_of_birth?: string
	province_id?: number
	municipality_id?: number
}
