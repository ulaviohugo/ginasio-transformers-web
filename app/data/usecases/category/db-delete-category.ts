import { DeleteCategory } from '@/domain/usecases'
import { CategoryRepository } from '@/data/protocols'

export class DbDeleteCategory implements DeleteCategory {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async delete(categoryId: number): Promise<boolean> {
		const foundCategory = await this.categoryRepository.findById(categoryId)

		if (!foundCategory) return null as any
		return this.categoryRepository.delete(categoryId)
	}
}
