import { Uploader } from '@/data/protocols/services'
import { ProductModel } from '@/domain/models'

export interface AddProduct {
	add(params: ProductModel, uploader?: Uploader): Promise<ProductModel>
}
