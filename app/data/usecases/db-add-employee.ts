import { AddEmployee, AddEmployeesResult } from '@/app/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Employee } from '../../domain/models'
import { ObjectUtils } from '@/app/utils'

export class DbAddEmployee implements AddEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}
	async add(param: Employee): Promise<AddEmployeesResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			data.documentType,
			data.documentNumber
		)
		if (foundByDoc && foundByDoc.id !== data.id) return 'documentInUse'

		return this.employeeRepository.add(data)
	}
}
