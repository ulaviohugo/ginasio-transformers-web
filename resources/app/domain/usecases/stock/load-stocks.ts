import { QueryParams } from '@/data/protocols'
import { StockModel } from '@/domain/models'

export interface LoadStocks {
	load(queryParams?: QueryParams<StockModel>): Promise<LoadStocksResult>
}

export type LoadStocksResult = StockModel[]
