import { ProductModel } from '@/domain/models'

export interface UpdateProduct {
	update(param: ProductModel): Promise<ProductModel>
}
