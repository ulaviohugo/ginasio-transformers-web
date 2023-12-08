import { QueryParams } from '@/data/protocols'
import { StockModel } from '@/domain/models'

export interface LoadPurchases {
	load(queryParams?: QueryParams<StockModel>): Promise<LoadPurchasesResult>
}

export type LoadPurchasesResult = StockModel[]
