import { LoadCurrentUser } from '@/app/domain/usecases'
import { EmployeeRepository } from '../../protocols'
import { PrismaEmployeeMapper } from '@/app/infra/db/prisma/mappers'
import { EmployeeModel } from '@/app/domain/models'

export class DbLoadCurrentUser implements LoadCurrentUser {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async load(id: number): Promise<EmployeeModel> {
		const employees = await this.employeeRepository.findById(id)
		return PrismaEmployeeMapper.toDomain(employees)
	}
}
