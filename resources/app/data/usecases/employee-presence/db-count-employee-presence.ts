import { CountEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'

export class DbCountEmployeePresence implements CountEmployeePresence {
	constructor(private readonly employeePresenceRepository: EmployeePresenceRepository) {}

	async count(): Promise<number> {
		return await this.employeePresenceRepository.count()
	}
}
