import { LoadEmployees, LoadEmployeesResult } from '@/app/domain/usecases'
import { EmployeeRepository } from '../../protocols'
import { PrismaEmployeeMapper } from '@/app/infra/db/prisma/mappers'

export class DbLoadEmployees implements LoadEmployees {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async load(): Promise<LoadEmployeesResult> {
		const employees = await this.employeeRepository.loadAll()
		return employees.map(PrismaEmployeeMapper.toDomain)
	}
}
