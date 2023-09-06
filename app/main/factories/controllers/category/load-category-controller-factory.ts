import { Controller } from '@/infra/http/protocols'
import { makeLoadCategories } from '@/main/factories'
import { LoadCategoriesController } from '@/infra/http/controllers'

export const makeLoadCategoryController = (): Controller => {
	return new LoadCategoriesController(makeLoadCategories())
}
