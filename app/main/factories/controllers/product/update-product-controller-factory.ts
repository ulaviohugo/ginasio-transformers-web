import { UpdateProductController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateProductValidation } from '.'
import { makeUpdateProduct } from '../..'

export const makeUpdateProductController = (): Controller => {
	return new UpdateProductController(makeUpdateProduct(), makeUpdateProductValidation())
}
