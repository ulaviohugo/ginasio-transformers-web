import { LoadSaleController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadSale } from '../..'

export const makeLoadSaleController = (): Controller => {
	return new LoadSaleController(makeLoadSale())
}
