import { CustomerModel } from '@/domain/models'

export interface CustomerRepository {
	add(param: CustomerModel): Promise<CustomerModel>
	findByEmail(email: string): Promise<CustomerModel | null>
	findById(employee_id: number): Promise<CustomerModel | null>
	loadAll(): Promise<CustomerModel[]>
	update(param: CustomerModel): Promise<CustomerModel>
	delete(employee_id: number): Promise<boolean>
	count(): Promise<number>
}
