import { LoadEmployeePresences } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeeModel } from '@/domain/models'

export class DbLoadEmployeePresences implements LoadEmployeePresences {
	constructor(private readonly employeePresenceRepository: EmployeePresenceRepository) {}
	async load(): Promise<EmployeeModel[]> {
		return this.employeePresenceRepository.loadAll()
	}
}
