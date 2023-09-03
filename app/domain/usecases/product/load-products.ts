import { ProductModel } from '../../models'

export interface LoadProducts {
	load(): Promise<ProductModel[]>
}
