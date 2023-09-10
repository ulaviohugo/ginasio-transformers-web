import { AddEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeePresenceModel } from '@/domain/models'

export class DbAddEmployeePresence implements AddEmployeePresence {
	constructor(private readonly employeeRepository: EmployeePresenceRepository) {}
	async add(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		return await this.employeeRepository.add(param)
	}
}