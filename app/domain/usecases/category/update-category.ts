import { CategoryModel } from '../../models'

export interface UpdateCategory {
	update(param: CategoryModel): Promise<CategoryModel | 'notFound' | 'nameInUse'>
}
