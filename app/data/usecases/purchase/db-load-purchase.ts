import { LoadPurchases, LoadPurchasesResult } from '@/app/domain/usecases'
import { PurchaseRepository } from '../../protocols'

export class DbLoadPurchase implements LoadPurchases {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}
	async load(): Promise<LoadPurchasesResult> {
		return this.purchaseRepository.loadAll()
	}
}
