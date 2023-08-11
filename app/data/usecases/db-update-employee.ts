import { UpdateEmployee } from '@/app/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Employee } from '../../domain/models'
import { ObjectUtils } from '@/app/utils'

export class DbUpdateEmployee implements UpdateEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	async update(
		param: Employee
	): Promise<Employee | 'notFound' | 'emailInUse' | 'documentInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.employeeRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			data.documentType,
			data.documentNumber
		)
		if (foundByDoc && foundByDoc.id !== data.id) return 'documentInUse'

		const employee: Employee = {
			...data,
			updatedAt: new Date()
		}
		return this.employeeRepository.update(employee)
	}
}
