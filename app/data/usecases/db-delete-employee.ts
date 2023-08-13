import { DeleteEmployee } from '@/app/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Uploader } from '../protocols/services'
import { FileUtils } from '@/app/utils'

export class DbDeleteEmployee implements DeleteEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	async delete(employeeId: number, uploader?: Uploader): Promise<boolean> {
		const foundEmployee = await this.employeeRepository.findById(employeeId)

		if (!foundEmployee) return null as any

		if (uploader && foundEmployee.image) {
			const path = FileUtils.getUploadAbsolutePath(foundEmployee.image)
			await uploader.delete(path)
		}
		return this.employeeRepository.delete(employeeId)
	}
}
