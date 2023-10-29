import { QueryParams } from '@/data/protocols'
import { ProductSaleModel } from '@/domain/models'

export interface LoadSales {
	load(queryParams?: QueryParams<ProductSaleModel>): Promise<LoadSalesResult>
}

export type LoadSalesResult = ProductSaleModel[]
