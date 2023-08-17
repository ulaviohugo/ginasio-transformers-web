import { LoadPurchaseController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadPurchase } from '../..'

export const makeLoadPurchaseController = (): Controller => {
	return new LoadPurchaseController(makeLoadPurchase())
}
