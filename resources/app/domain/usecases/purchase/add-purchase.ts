import { StockModel } from '@/domain/models'

export interface AddPurchase {
	add(param: StockModel): Promise<AddPurchasesResult>
}

export type AddPurchasesResult = StockModel
