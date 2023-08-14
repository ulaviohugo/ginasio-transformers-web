import { Controller } from '@/app/infra/http/protocols'
import { makeLoadCategories } from '../..'
import { LoadCategoriesController } from '@/app/infra/http/controllers'

export const makeLoadCategoryController = (): Controller => {
	return new LoadCategoriesController(makeLoadCategories())
}
