import { UpdateCustomer } from '@/domain/usecases'
import { CustomerRepository } from '../../protocols'
import { CustomerModel } from '../../../domain/models'
import { FileUtils, ObjectUtils } from '@/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdateCustomer implements UpdateCustomer {
	constructor(private readonly employeeRepository: CustomerRepository) {}

	async update(
		param: CustomerModel,
		uploader?: Uploader
	): Promise<CustomerModel | 'notFound' | 'emailInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.employeeRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = data.email && (await this.employeeRepository.findByEmail(data.email))
		if (exists && exists.id !== data.id) return 'emailInUse'

		let image
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			image = await uploader.upload()
		}

		const updatedCustomer = await this.employeeRepository.update({
			...data,
			photo: image,
			updatedAt: new Date()
		})

		return updatedCustomer
	}
}
