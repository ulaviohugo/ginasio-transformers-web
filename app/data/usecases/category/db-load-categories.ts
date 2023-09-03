import { LoadCategories } from '@/app/domain/usecases'
import { CategoryRepository } from '../../protocols'
import { CategoryModel } from '@/app/domain/models'

export class DbLoadCategories implements LoadCategories {
	constructor(private readonly categoryRepository: CategoryRepository) {}
	async load(): Promise<CategoryModel[]> {
		return this.categoryRepository.loadAll()
	}
}
