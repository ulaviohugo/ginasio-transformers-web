import { AddEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeePresenceModel } from '@/domain/models'

export class DbAddEmployeePresence implements AddEmployeePresence {
	constructor(private readonly employeePresenceRepository: EmployeePresenceRepository) {}
	async add(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		const exists = await this.employeePresenceRepository.find({
			employeeId: param.employeeId,
			date: param.date
		})
		if (exists) return null as any
		return await this.employeePresenceRepository.add(param)
	}
}
