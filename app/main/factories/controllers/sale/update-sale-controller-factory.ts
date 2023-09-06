import { UpdateSaleController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateSaleValidation } from '.'
import { makeUpdateSale } from '../..'

export const makeUpdateSaleController = (): Controller => {
	return new UpdateSaleController(makeUpdateSale(), makeUpdateSaleValidation())
}
