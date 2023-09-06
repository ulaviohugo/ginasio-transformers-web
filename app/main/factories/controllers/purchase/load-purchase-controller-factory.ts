import { LoadPurchaseController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadPurchase } from '../..'

export const makeLoadPurchaseController = (): Controller => {
	return new LoadPurchaseController(makeLoadPurchase())
}
