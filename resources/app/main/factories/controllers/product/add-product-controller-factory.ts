import { Controller } from '@/infra/http/protocols'
import { makeAddProductValidation } from '..'
import { makeAddProduct } from '@/main/factories'
import { AddProductController } from '@/infra/http/controllers'

export const makeAddProductController = (): Controller => {
	return new AddProductController(makeAddProduct(), makeAddProductValidation())
}
