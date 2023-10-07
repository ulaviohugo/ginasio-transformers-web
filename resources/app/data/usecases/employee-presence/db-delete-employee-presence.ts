import { DeleteEmployeePresence } from '@/domain/usecases'
import { EmployeePresenceRepository } from '@/data/protocols'

export class DbDeleteEmployeePresence implements DeleteEmployeePresence {
	constructor(private readonly employeePresenceRepository: EmployeePresenceRepository) {}

	async delete(employee_id: number): Promise<boolean> {
		const foundEmployeePresence = await this.employeePresenceRepository.find({
			employee_id
		})
		if (!foundEmployeePresence) return null as any
		return this.employeePresenceRepository.delete(employee_id)
	}
}
