import { ProductModel } from '@/domain/models'

export interface AddProduct {
	add(params: ProductModel): Promise<ProductModel>
}
