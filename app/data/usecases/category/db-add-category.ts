import { AddCategory } from '@/app/domain/usecases'
import { CategoryRepository } from '../../protocols'
import { CategoryModel } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'

export class DbAddCategory implements AddCategory {
	constructor(private readonly categoryRepository: CategoryRepository) {}
	async add(param: CategoryModel): Promise<CategoryModel> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.categoryRepository.findByName(data.name)
		if (exists) return null as any

		return this.categoryRepository.add(data)
	}
}
