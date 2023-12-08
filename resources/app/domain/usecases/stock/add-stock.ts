import { StockModel } from '@/domain/models'

export interface AddStock {
	add(param: StockModel): Promise<AddStocksResult>
}

export type AddStocksResult = StockModel
