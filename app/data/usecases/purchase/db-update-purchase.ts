import { UpdatePurchase } from '@/app/domain/usecases'
import { PurchaseRepository } from '../../protocols'
import { Purchase } from '../../../domain/models'
import { FileUtils, ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdatePurchase implements UpdatePurchase {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}

	async update(param: Purchase, uploader?: Uploader): Promise<Purchase | 'notFound'> {
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

		const purchase: Purchase = {
			...data,
			photo,
			updatedAt: new Date()
		}
		return this.purchaseRepository.update(purchase)
	}
}
