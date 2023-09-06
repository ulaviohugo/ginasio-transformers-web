import { LoadCustomers, LoadCustomersResult } from '@/domain/usecases'
import { CustomerRepository } from '../../protocols'

export class DbLoadCustomers implements LoadCustomers {
	constructor(private readonly employeeRepository: CustomerRepository) {}
	async load(): Promise<LoadCustomersResult> {
		const employees = await this.employeeRepository.loadAll()
		return employees
	}
}
