import { Category } from '../../models'

export interface LoadCategories {
	load(): Promise<Category[]>
}
