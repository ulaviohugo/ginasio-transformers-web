import { CategoryModel } from '../../models'

export interface LoadCategories {
	load(): Promise<CategoryModel[]>
}
