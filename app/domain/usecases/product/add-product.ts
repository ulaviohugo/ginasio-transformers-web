import { Uploader } from '@/app/data/protocols/services'
import { Product } from '../../models'

export interface AddProduct {
	add(params: Product, uploader?: Uploader): Promise<Product>
}
