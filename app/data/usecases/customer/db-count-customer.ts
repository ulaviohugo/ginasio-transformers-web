import { CountCustomer } from '@/app/domain/usecases'
import { CustomerRepository } from '../../protocols'

export class DbCountCustomer implements CountCustomer {
	constructor(private readonly employeeRepository: CustomerRepository) {}

	async count(): Promise<number> {
		return await this.employeeRepository.count()
	}
}
