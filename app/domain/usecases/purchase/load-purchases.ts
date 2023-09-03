import { PurchaseModel } from '../../models'

export interface LoadPurchases {
	load(): Promise<LoadPurchasesResult>
}

export type LoadPurchasesResult = PurchaseModel[]
