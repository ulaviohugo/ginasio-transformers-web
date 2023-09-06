import { UpdateProductController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateProductValidation } from '.'
import { makeUpdateProduct } from '@/main/factories'

export const makeUpdateProductController = (): Controller => {
	return new UpdateProductController(makeUpdateProduct(), makeUpdateProductValidation())
}
