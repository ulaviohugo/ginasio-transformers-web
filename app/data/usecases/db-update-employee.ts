import { UpdateEmployee } from '@/app/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Employee } from '../../domain/models'
import { FileUtils, ObjectUtils } from '@/app/utils'
import { Uploader } from '../protocols/services'

export class DbUpdateEmployee implements UpdateEmployee {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	async update(
		param: Employee,
		uploader?: Uploader
	): Promise<Employee | 'notFound' | 'emailInUse' | 'documentInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.employeeRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			data.documentType,
			data.documentNumber
		)
		if (foundByDoc && foundByDoc.id !== data.id) return 'documentInUse'

		let image
		if (uploader) {
			if (foundById.image) {
				const path = FileUtils.getUploadAbsolutePath(foundById.image)
				await uploader.delete(path)
			}
			image = await uploader.upload()
		}

		const employee: Employee = {
			...data,
			image,
			updatedAt: new Date()
		}
		return this.employeeRepository.update(employee)
	}
}
