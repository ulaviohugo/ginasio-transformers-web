import { QueryParams } from '@/data/protocols'
import { ProductionSaleModel } from '@/domain/models'

export interface LoadProductionSales {
	load(queryParams?: QueryParams<ProductionSaleModel>): Promise<LoadProductionSalesResult>
}

export type LoadProductionSalesResult = ProductionSaleModel[]
