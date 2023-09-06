import { Uploader } from '@/data/protocols/services'
import { ProductModel } from '@/domain/models'

export interface UpdateProduct {
	update(param: ProductModel, uploader?: Uploader): Promise<ProductModel>
}
