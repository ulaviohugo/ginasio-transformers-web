import { ProductSaleModel } from '@/domain/models'

export interface UpdateProductSale {
	update(param: ProductSaleModel): Promise<ProductSaleModel>
}
