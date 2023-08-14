import { CountCategoryController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountCategory } from '../..'

export const makeCountCategoryController = (): Controller => {
	return new CountCategoryController(makeCountCategory())
}
