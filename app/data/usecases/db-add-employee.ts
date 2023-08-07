import { AddEmployee, AddEmployeesResult } from '@/app/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Employee } from '../../domain/models'

export class DbAddEmployee implements AddEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async add(param: Employee): Promise<AddEmployeesResult> {
		const exists = await this.employeeRepository.findByEmail(param.email)
		if (exists && exists.id !== param.id) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			param.documentType,
			param.documentNumber
		)
		if (foundByDoc && foundByDoc.id !== param.id) return 'documentInUse'

		const employee: Employee = {
			...param,
			dateOfBirth: new Date(param.dateOfBirth),
			hireDate: new Date(param.hireDate),
			contractEndDate: param.contractEndDate
				? new Date(param.contractEndDate)
				: (null as any)
		}
		return this.employeeRepository.add(employee)
	}
}
