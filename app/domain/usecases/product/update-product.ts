import { Uploader } from '@/app/data/protocols/services'
import { Product } from '../../models'

export interface UpdateProduct {
	update(param: Product, uploader?: Uploader): Promise<Product>
}
