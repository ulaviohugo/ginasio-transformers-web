import { CountProductController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountProduct } from '../..'

export const makeCountProductController = (): Controller => {
	return new CountProductController(makeCountProduct())
}
