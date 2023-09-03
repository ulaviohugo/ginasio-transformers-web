import { CustomerModel } from '@/app/domain/models'

export interface CustomerRepository {
	add(param: CustomerModel): Promise<CustomerModel>
	findByEmail(email: string): Promise<CustomerModel | null>
	findById(employeeId: number): Promise<CustomerModel | null>
	loadAll(): Promise<CustomerModel[]>
	update(param: CustomerModel): Promise<CustomerModel>
	delete(employeeId: number): Promise<boolean>
	count(): Promise<number>
}
