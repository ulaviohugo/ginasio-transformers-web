import { PurchaseModel } from '@/domain/models'

export interface LoadPurchases {
	load(): Promise<LoadPurchasesResult>
}

export type LoadPurchasesResult = PurchaseModel[]
