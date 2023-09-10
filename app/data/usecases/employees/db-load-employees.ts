import { LoadEmployees, LoadEmployeesResult } from '@/domain/usecases'
import { EmployeeRepository } from '@/data/protocols'

export class DbLoadEmployees implements LoadEmployees {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async load(): Promise<LoadEmployeesResult> {
		return this.employeeRepository.loadAll()
	}
}
