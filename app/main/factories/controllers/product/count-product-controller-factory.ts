import { CountProductController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountProduct } from '../..'

export const makeCountProductController = (): Controller => {
	return new CountProductController(makeCountProduct())
}
