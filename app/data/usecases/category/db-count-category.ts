import { CountCategory } from '@/domain/usecases'
import { CategoryRepository } from '@/data/protocols'

export class DbCountCategory implements CountCategory {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async count(): Promise<number> {
		return await this.categoryRepository.count()
	}
}
