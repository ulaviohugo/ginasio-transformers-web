import { DeleteEmployeePresence } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { EmployeePresenceRepository } from '@/data/protocols'

export class DbDeleteEmployeePresence implements DeleteEmployeePresence {
	constructor(private readonly employeeRepository: EmployeePresenceRepository) {}

	async delete(employeeId: number): Promise<boolean> {
		const foundEmployeePresence = await this.employeeRepository.find({ employeeId })
		if (!foundEmployeePresence) return null as any
		return this.employeeRepository.delete(employeeId)
	}
}
