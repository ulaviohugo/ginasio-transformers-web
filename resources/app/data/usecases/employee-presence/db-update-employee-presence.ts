import { UpdateEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeePresenceModel } from '@/domain/models'

export class DbUpdateEmployeePresence implements UpdateEmployeePresence {
	constructor(private readonly employeePresenceRepository: EmployeePresenceRepository) {}

	async update(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		const foundById = await this.employeePresenceRepository.find({ id: param.id })
		if (!foundById) return null as any

		const updatedEmployeePresence = await this.employeePresenceRepository.update({
			...param,
			updatedAt: new Date()
		})
		return updatedEmployeePresence
	}
}
