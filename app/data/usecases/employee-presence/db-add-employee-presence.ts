import { AddEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeePresenceModel } from '@/domain/models'

export class DbAddEmployeePresence implements AddEmployeePresence {
	constructor(private readonly employeeRepository: EmployeePresenceRepository) {}
	async add(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		const exists = await this.employeeRepository.find({
			employeeId: param.employeeId,
			date: param.date
		})
		if (exists) return null as any
		return await this.employeeRepository.add(param)
	}
}
