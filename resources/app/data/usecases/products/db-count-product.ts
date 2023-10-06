import { CountProduct } from '@/domain/usecases'
import { ProductRepository } from '@/data/protocols'

export class DbCountProduct implements CountProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async count(): Promise<number> {
		return await this.productRepository.count()
	}
}
