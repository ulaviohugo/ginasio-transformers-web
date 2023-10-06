import { QueryParams } from '@/data/protocols'
import { PurchaseModel } from '@/domain/models'

export interface LoadPurchases {
	load(queryParams?: QueryParams<PurchaseModel>): Promise<LoadPurchasesResult>
}

export type LoadPurchasesResult = PurchaseModel[]
