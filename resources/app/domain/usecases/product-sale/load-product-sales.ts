import { QueryParams } from '@/data/protocols'
import { ProductSaleModel } from '@/domain/models'

export interface LoadProductSales {
	load(queryParams?: QueryParams<ProductSaleModel>): Promise<LoadProductSalesResult>
}

export type LoadProductSalesResult = ProductSaleModel[]
