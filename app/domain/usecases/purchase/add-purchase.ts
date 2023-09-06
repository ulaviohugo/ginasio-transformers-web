import { Uploader } from '@/data/protocols/services'
import { PurchaseModel } from '@/domain/models'

export interface AddPurchase {
	add(param: PurchaseModel, uploader?: Uploader): Promise<AddPurchasesResult>
}

export type AddPurchasesResult = PurchaseModel
