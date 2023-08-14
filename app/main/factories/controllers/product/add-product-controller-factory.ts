import { Controller } from '@/app/infra/http/protocols'
import { makeAddProductValidation } from '..'
import { makeAddProduct } from '../..'
import { AddProductController } from '@/app/infra/http/controllers'

export const makeAddProductController = (): Controller => {
	return new AddProductController(makeAddProduct(), makeAddProductValidation())
}
