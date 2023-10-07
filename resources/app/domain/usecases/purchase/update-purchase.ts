import { PurchaseModel } from '@/domain/models'

export interface UpdatePurchase {
	update(param: PurchaseModel): Promise<PurchaseModel>
}
