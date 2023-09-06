import { CountEmployee } from '@/domain/usecases'
import { EmployeeRepository } from '../../protocols'

export class DbCountEmployee implements CountEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	async count(): Promise<number> {
		return await this.employeeRepository.count()
	}
}
