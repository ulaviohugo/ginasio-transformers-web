import { QueryParams } from '@/data/protocols'
import { SaleModel } from '@/domain/models'

export interface LoadSales {
	load(queryParams?: QueryParams<SaleModel>): Promise<LoadSalesResult>
}

export type LoadSalesResult = SaleModel[]
