import { AddPurchase, AddPurchasesResult } from '@/app/domain/usecases'
import { PurchaseRepository } from '../../protocols'
import { Purchase } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbAddPurchase implements AddPurchase {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}
	async add(param: Purchase, uploader?: Uploader): Promise<AddPurchasesResult> {
		const data = ObjectUtils.trimValues(param)
		let photo
		if (uploader) {
			photo = await uploader.upload()
		}
		return this.purchaseRepository.add({ ...data, photo })
	}
}