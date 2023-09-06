import { LoadEmployees, LoadEmployeesResult } from '@/domain/usecases'
import { EmployeeRepository } from '@/data/protocols'
import { PrismaEmployeeMapper } from '@/infra/db/prisma/mappers'

export class DbLoadEmployees implements LoadEmployees {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async load(): Promise<LoadEmployeesResult> {
		const employees = await this.employeeRepository.loadAll()
		return employees.map(PrismaEmployeeMapper.toDomain)
	}
}
