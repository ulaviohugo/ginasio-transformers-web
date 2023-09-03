import { UpdateCategory } from '@/app/domain/usecases'
import { CategoryRepository } from '../../protocols'
import { CategoryModel } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'

export class DbUpdateCategory implements UpdateCategory {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async update(param: CategoryModel): Promise<CategoryModel | 'notFound' | 'nameInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.categoryRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.categoryRepository.findByName(data.name)
		if (exists && exists.id !== data.id) return 'nameInUse'

		const category: CategoryModel = {
			...data,
			updatedAt: new Date()
		}
		return this.categoryRepository.update(category)
	}
}
