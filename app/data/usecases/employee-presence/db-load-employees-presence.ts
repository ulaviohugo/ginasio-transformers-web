import { LoadEmployeePresences } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'
import { EmployeePresenceModel } from '@/domain/models'

export class DbLoadEmployeePresences implements LoadEmployeePresences {
	constructor(private readonly employeeRepository: EmployeePresenceRepository) {}
	async load(): Promise<EmployeePresenceModel[]> {
		return this.employeeRepository.loadAll()
	}
}
