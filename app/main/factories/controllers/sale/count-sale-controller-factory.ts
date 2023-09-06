import { CountSaleController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountSale } from '../..'

export const makeCountSaleController = (): Controller => {
	return new CountSaleController(makeCountSale())
}
