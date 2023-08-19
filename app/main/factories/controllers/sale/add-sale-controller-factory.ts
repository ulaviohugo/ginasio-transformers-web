import { Controller } from '@/app/infra/http/protocols'
import { makeAddSaleValidation } from '..'
import { makeAddSale } from '../..'
import { AddSaleController } from '@/app/infra/http/controllers'

export const makeAddSaleController = (): Controller => {
	return new AddSaleController(makeAddSale(), makeAddSaleValidation())
}
