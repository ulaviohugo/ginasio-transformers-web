import { LoadProducts } from '@/app/domain/usecases'
import { ProductRepository } from '../../protocols'
import { ProductModel } from '@/app/domain/models'

export class DbLoadProducts implements LoadProducts {
	constructor(private readonly productRepository: ProductRepository) {}
	async load(): Promise<ProductModel[]> {
		return this.productRepository.loadAll()
	}
}
