import { UpdatePurchase } from '@/domain/usecases'
import { PurchaseRepository } from '../../protocols'
import { PurchaseModel } from '../../../domain/models'
import { FileUtils, ObjectUtils } from '@/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdatePurchase implements UpdatePurchase {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}

	async update(
		param: PurchaseModel,
		uploader?: Uploader
	): Promise<PurchaseModel | 'notFound'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.purchaseRepository.findById(data.id)
		if (!foundById) return 'notFound'

		let photo
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			photo = await uploader.upload()
		}

		const purchase: PurchaseModel = {
			...data,
			photo,
			updatedAt: new Date()
		}
		return this.purchaseRepository.update(purchase)
	}
}
