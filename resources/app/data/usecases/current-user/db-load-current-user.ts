import { LoadCurrentUser } from '@/domain/usecases'
import { EmployeeRepository } from '@/data/protocols'
import { PrismaEmployeeMapper } from '@/infra/db/prisma/mappers'
import { EmployeeModel } from '@/domain/models'

export class DbLoadCurrentUser implements LoadCurrentUser {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async load(id: number): Promise<EmployeeModel> {
		return this.employeeRepository.findById(id) as any
	}
}
