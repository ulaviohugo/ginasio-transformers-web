import { CategoryModel } from '@/domain/models'

export interface AddCategory {
	add(params: CategoryModel): Promise<CategoryModel>
}
