import { UpdateSaleController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdateSaleValidation } from '.'
import { makeUpdateSale } from '../..'

export const makeUpdateSaleController = (): Controller => {
	return new UpdateSaleController(makeUpdateSale(), makeUpdateSaleValidation())
}
