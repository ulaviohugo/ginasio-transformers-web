import { UpdateCategoryController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateCategory, makeUpdateCategoryValidation } from '../..'

export const makeUpdateCategoryController = (): Controller => {
	return new UpdateCategoryController(
		makeUpdateCategory(),
		makeUpdateCategoryValidation()
	)
}
