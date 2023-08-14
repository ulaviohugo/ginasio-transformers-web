import { Category } from '../../models'

export interface UpdateCategory {
	update(param: Category): Promise<Category | 'notFound' | 'nameInUse'>
}
