import { Uploader } from '@/app/data/protocols/services'
import { ProductModel } from '../../models'

export interface AddProduct {
	add(params: ProductModel, uploader?: Uploader): Promise<ProductModel>
}
