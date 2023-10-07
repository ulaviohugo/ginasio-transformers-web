import { PurchaseModel } from '@/domain/models'

export interface AddPurchase {
	add(param: PurchaseModel): Promise<AddPurchasesResult>
}

export type AddPurchasesResult = PurchaseModel
