import { CountPurchase } from '@/app/domain/usecases'
import { PurchaseRepository } from '../../protocols'

export class DbCountPurchase implements CountPurchase {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}

	async count(): Promise<number> {
		return await this.purchaseRepository.count()
	}
}
