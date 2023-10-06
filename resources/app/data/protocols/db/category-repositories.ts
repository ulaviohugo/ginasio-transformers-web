import { CategoryModel } from '@/domain/models'

export interface CategoryRepository {
	add(param: CategoryModel): Promise<CategoryModel>
	findByName(name: string): Promise<CategoryModel | null>
	findById(categoryId: number): Promise<CategoryModel | null>
	loadAll(): Promise<CategoryModel[]>
	update(param: CategoryModel): Promise<CategoryModel>
	delete(categoryId: number): Promise<boolean>
	count(): Promise<number>
}
