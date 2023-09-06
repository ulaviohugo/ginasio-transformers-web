import { Controller } from '@/infra/http/protocols'
import { makeAddCategory } from '@/main/factories'
import { AddCategoryController } from '@/infra/http/controllers'
import { makeAddCategoryValidation } from './add-category-validation-factory'

export const makeAddCategoryController = (): Controller => {
	return new AddCategoryController(makeAddCategory(), makeAddCategoryValidation())
}
