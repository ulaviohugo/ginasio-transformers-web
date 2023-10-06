import { ProductSaleModel } from '@/domain/models'
import { QueryParams } from '.'

export interface ProductSaleRepository {
	add(param: ProductSaleModel): Promise<ProductSaleModel>
	findById(id: number): Promise<ProductSaleModel | null>
	find(queryParams?: QueryParams<ProductSaleModel>): Promise<ProductSaleModel | null>
	loadAll(queryParams?: QueryParams<ProductSaleModel>): Promise<ProductSaleModel[]>
	update(param: ProductSaleModel): Promise<ProductSaleModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
