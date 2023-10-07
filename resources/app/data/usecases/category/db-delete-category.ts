import { DeleteCategory } from '@/domain/usecases'
import { CategoryRepository } from '@/data/protocols'

export class DbDeleteCategory implements DeleteCategory {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async delete(category_id: number): Promise<boolean> {
		const foundCategory = await this.categoryRepository.findById(category_id)

		if (!foundCategory) return null as any
		return this.categoryRepository.delete(category_id)
	}
}
