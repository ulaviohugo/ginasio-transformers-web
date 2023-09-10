import { UpdateEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeePresenceModel } from '@/domain/models'

export class DbUpdateEmployeePresence implements UpdateEmployeePresence {
	constructor(private readonly employeeRepository: EmployeePresenceRepository) {}

	async update(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		const foundById = await this.employeeRepository.findById(param.id)
		if (!foundById) return null as any

		const updatedEmployeePresence = await this.employeeRepository.update({
			...param,
			updatedAt: new Date()
		})
		return updatedEmployeePresence
	}
}
