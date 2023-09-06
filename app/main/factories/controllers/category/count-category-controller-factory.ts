import { CountCategoryController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountCategory } from '@/main/factories'

export const makeCountCategoryController = (): Controller => {
	return new CountCategoryController(makeCountCategory())
}
