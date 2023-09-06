import { AddPurchase, AddPurchasesResult } from '@/domain/usecases'
import { PurchaseRepository } from '../../protocols'
import { PurchaseModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'
import { Uploader } from '../../protocols/services'

export class DbAddPurchase implements AddPurchase {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}
	async add(param: PurchaseModel, uploader?: Uploader): Promise<AddPurchasesResult> {
		const data = ObjectUtils.trimValues(param)
		let photo
		if (uploader) {
			photo = await uploader.upload()
		}
		return this.purchaseRepository.add({ ...data, photo })
	}
}
