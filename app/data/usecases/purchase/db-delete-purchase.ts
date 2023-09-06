import { DeletePurchase } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { PurchaseRepository } from '@/data/protocols'
import { Uploader } from '@/data/protocols/services'

export class DbDeletePurchase implements DeletePurchase {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}

	async delete(i: number, uploader?: Uploader): Promise<boolean> {
		const foundPurchase = await this.purchaseRepository.findById(i)

		if (!foundPurchase) return null as any

		if (uploader && foundPurchase.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundPurchase.photo)
			await uploader.delete(path)
		}
		return this.purchaseRepository.delete(i)
	}
}
