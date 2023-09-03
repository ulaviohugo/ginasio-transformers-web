import { Uploader } from '@/app/data/protocols/services'
import { PurchaseModel } from '../../models'

export interface AddPurchase {
	add(param: PurchaseModel, uploader?: Uploader): Promise<AddPurchasesResult>
}

export type AddPurchasesResult = PurchaseModel
