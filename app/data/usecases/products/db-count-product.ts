import { CountProduct } from '@/app/domain/usecases'
import { ProductRepository } from '../../protocols'

export class DbCountProduct implements CountProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async count(): Promise<number> {
		return await this.productRepository.count()
	}
}
