import { LoadProducts } from '@/app/domain/usecases'
import { ProductRepository } from '../../protocols'
import { Product } from '@/app/domain/models'

export class DbLoadProducts implements LoadProducts {
	constructor(private readonly productRepository: ProductRepository) {}
	async load(): Promise<Product[]> {
		return this.productRepository.loadAll()
	}
}
