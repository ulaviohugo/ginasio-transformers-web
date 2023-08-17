import { Uploader } from '@/app/data/protocols/services'
import { Purchase } from '../../models'

export interface AddPurchase {
	add(param: Purchase, uploader?: Uploader): Promise<AddPurchasesResult>
}

export type AddPurchasesResult = Purchase
