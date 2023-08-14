import { Category } from '@/app/domain/models'

export interface CategoryRepository {
	add(param: Category): Promise<Category>
	findByName(name: string): Promise<Category | null>
	findById(categoryId: number): Promise<Category | null>
	loadAll(): Promise<Category[]>
	update(param: Category): Promise<Category>
	delete(categoryId: number): Promise<boolean>
	count(): Promise<number>
}
