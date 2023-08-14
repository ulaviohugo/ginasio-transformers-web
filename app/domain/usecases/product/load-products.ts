import { Product } from '../../models'

export interface LoadProducts {
	load(): Promise<Product[]>
}
