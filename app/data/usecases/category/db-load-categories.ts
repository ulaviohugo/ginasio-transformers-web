import { LoadCategories } from '@/domain/usecases'
import { CategoryRepository } from '@/data/protocols'
import { CategoryModel } from '@/domain/models'

export class DbLoadCategories implements LoadCategories {
	constructor(private readonly categoryRepository: CategoryRepository) {}
	async load(): Promise<CategoryModel[]> {
		return this.categoryRepository.loadAll()
	}
}
