import { CountCategoryController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountCategory } from '../..'

export const makeCountCategoryController = (): Controller => {
	return new CountCategoryController(makeCountCategory())
}
