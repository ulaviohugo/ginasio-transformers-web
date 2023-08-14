import { UpdateCategoryController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateCategory, makeUpdateCategoryValidation } from '../..'

export const makeUpdateCategoryController = (): Controller => {
	return new UpdateCategoryController(
		makeUpdateCategory(),
		makeUpdateCategoryValidation()
	)
}
