import { LoadPurchases, LoadPurchasesResult } from '@/domain/usecases'
import { PurchaseRepository, QueryParams } from '@/data/protocols'
import { PurchaseModel } from '@/domain/models'

export class DbLoadPurchase implements LoadPurchases {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}
	async load(queryParams?: QueryParams<PurchaseModel>): Promise<LoadPurchasesResult> {
		return this.purchaseRepository.loadAll(queryParams)
	}
}
