import { UpdateEmployee } from '@/domain/usecases'
import { EmployeeRepository } from '@/data/protocols'
import { EmployeeModel } from '@/domain/models'
import { FileUtils, ObjectUtils } from '@/utils'
import { Uploader } from '@/data/protocols/services'
import { Hasher } from '@/data/protocols/cryptography'
import { PrismaEmployeeMapper } from '@/infra/db/prisma/mappers'

export class DbUpdateEmployee implements UpdateEmployee {
	constructor(
		private readonly employeeRepository: EmployeeRepository,
		private readonly hasher: Hasher
	) {}

	async update(
		param: EmployeeModel,
		uploader?: Uploader
	): Promise<EmployeeModel | 'notFound' | 'emailInUse' | 'documentInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.employeeRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			data.document_type,
			data.document_number
		)
		if (foundByDoc && foundByDoc.id !== data.id) return 'documentInUse'

		let image
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			image = await uploader.upload()
		}

		let hashedPassword: any
		if (data.password) {
			hashedPassword = await this.hasher.hash(data.password)
		}
		const updatedEmployee = await this.employeeRepository.update({
			...data,
			photo: image,
			password: hashedPassword,
			updated_at: new Date()
		})

		return updatedEmployee
	}
}
