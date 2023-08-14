import { Category } from '../../models'

export interface AddCategory {
	add(params: Category): Promise<Category>
}
