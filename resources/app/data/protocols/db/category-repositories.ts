import { CategoryModel } from '@/domain/models'

export interface CategoryRepository {
	add(param: CategoryModel): Promise<CategoryModel>
	findByName(name: string): Promise<CategoryModel | null>
	findById(category_id: number): Promise<CategoryModel | null>
	loadAll(): Promise<CategoryModel[]>
	update(param: CategoryModel): Promise<CategoryModel>
	delete(category_id: number): Promise<boolean>
	count(): Promise<number>
}
