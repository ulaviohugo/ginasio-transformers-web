import { DeleteEmployee } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { EmployeeRepository } from '../../protocols'
import { Uploader } from '../../protocols/services'

export class DbDeleteEmployee implements DeleteEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	async delete(employeeId: number, uploader?: Uploader): Promise<boolean> {
		const foundEmployee = await this.employeeRepository.findById(employeeId)

		if (!foundEmployee) return null as any

		if (uploader && foundEmployee.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundEmployee.photo)
			await uploader.delete(path)
		}
		return this.employeeRepository.delete(employeeId)
	}
}
