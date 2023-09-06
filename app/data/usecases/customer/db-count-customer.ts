import { CountCustomer } from '@/domain/usecases'
import { CustomerRepository } from '@/data/protocols'

export class DbCountCustomer implements CountCustomer {
	constructor(private readonly employeeRepository: CustomerRepository) {}

	async count(): Promise<number> {
		return await this.employeeRepository.count()
	}
}
