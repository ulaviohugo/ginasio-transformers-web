import { CountSaleController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountSale } from '@/main/factories'

export const makeCountSaleController = (): Controller => {
	return new CountSaleController(makeCountSale())
}
