import { UpdateCategoryController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateCategory, makeUpdateCategoryValidation } from '@/main/factories'

export const makeUpdateCategoryController = (): Controller => {
	return new UpdateCategoryController(
		makeUpdateCategory(),
		makeUpdateCategoryValidation()
	)
}
