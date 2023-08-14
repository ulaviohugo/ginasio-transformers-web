import { Controller } from '@/app/infra/http/protocols'
import { makeAddCategory } from '../..'
import { AddCategoryController } from '@/app/infra/http/controllers'
import { makeAddCategoryValidation } from './add-category-validation-factory'

export const makeAddCategoryController = (): Controller => {
	return new AddCategoryController(makeAddCategory(), makeAddCategoryValidation())
}
