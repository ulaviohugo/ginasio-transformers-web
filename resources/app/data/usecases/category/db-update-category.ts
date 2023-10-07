import { UpdateCategory } from '@/domain/usecases'
import { CategoryRepository } from '@/data/protocols'
import { CategoryModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

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
			updated_at: new Date()
		}
		return this.categoryRepository.update(category)
	}
}
