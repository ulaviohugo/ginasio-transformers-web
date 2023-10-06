import { DeleteEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'

export class DbDeleteEmployeePresence implements DeleteEmployeePresence {
	constructor(private readonly employeePresenceRepository: EmployeePresenceRepository) {}

	async delete(employeeId: number): Promise<boolean> {
		const foundEmployeePresence = await this.employeePresenceRepository.find({
			employeeId
		})
		if (!foundEmployeePresence) return null as any
		return this.employeePresenceRepository.delete(employeeId)
	}
}
