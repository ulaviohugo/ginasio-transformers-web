import { CategoryModel } from '@/domain/models'

export interface LoadCategories {
	load(): Promise<CategoryModel[]>
}
