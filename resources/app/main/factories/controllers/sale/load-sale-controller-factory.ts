import { LoadSaleController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadSale } from '@/main/factories'

export const makeLoadSaleController = (): Controller => {
	return new LoadSaleController(makeLoadSale())
}
