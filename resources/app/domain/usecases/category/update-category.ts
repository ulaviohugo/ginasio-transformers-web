import { CategoryModel } from '@/domain/models'

export interface UpdateCategory {
	update(param: CategoryModel): Promise<CategoryModel>
}
