import { CountSaleController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountSale } from '../..'

export const makeCountSaleController = (): Controller => {
	return new CountSaleController(makeCountSale())
}
