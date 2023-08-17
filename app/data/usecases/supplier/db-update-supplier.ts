import { UpdateSupplier } from '@/app/domain/usecases'
import { SupplierRepository } from '../../protocols'
import { Supplier } from '../../../domain/models'
import { FileUtils, ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdateSupplier implements UpdateSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}

	async update(
		param: Supplier,
		uploader?: Uploader
	): Promise<Supplier | 'notFound' | 'emailInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.supplierRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.supplierRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		let photo
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			photo = await uploader.upload()
		}

		const supplier: Supplier = {
			...data,
			photo,
			updatedAt: new Date()
		}
		return this.supplierRepository.update(supplier)
	}
}
