import { LoadCategories } from '@/app/domain/usecases'
import { CategoryRepository } from '../../protocols'
import { Category } from '@/app/domain/models'

export class DbLoadCategories implements LoadCategories {
	constructor(private readonly categoryRepository: CategoryRepository) {}
	async load(): Promise<Category[]> {
		return this.categoryRepository.loadAll()
	}
}
