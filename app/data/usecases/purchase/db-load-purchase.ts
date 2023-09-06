import { LoadPurchases, LoadPurchasesResult } from '@/domain/usecases'
import { PurchaseRepository } from '@/data/protocols'

export class DbLoadPurchase implements LoadPurchases {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}
	async load(): Promise<LoadPurchasesResult> {
		return this.purchaseRepository.loadAll()
	}
}
