import { LoadProducts } from '@/domain/usecases'
import { ProductRepository } from '../../protocols'
import { ProductModel } from '@/domain/models'

export class DbLoadProducts implements LoadProducts {
	constructor(private readonly productRepository: ProductRepository) {}
	async load(): Promise<ProductModel[]> {
		return this.productRepository.loadAll()
	}
}
