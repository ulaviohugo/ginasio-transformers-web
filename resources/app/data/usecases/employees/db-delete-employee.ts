import { DeleteEmployee } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { EmployeeRepository } from '@/data/protocols'
import { Uploader } from '@/data/protocols/services'

export class DbDeleteEmployee implements DeleteEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	async delete(employee_id: number, uploader?: Uploader): Promise<boolean> {
		const foundEmployee = await this.employeeRepository.findById(employee_id)

		if (!foundEmployee) return null as any

		if (uploader && foundEmployee.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundEmployee.photo)
			await uploader.delete(path)
		}
		return this.employeeRepository.delete(employee_id)
	}
}
