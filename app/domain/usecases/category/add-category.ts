import { CategoryModel } from '../../models'

export interface AddCategory {
	add(params: CategoryModel): Promise<CategoryModel>
}
