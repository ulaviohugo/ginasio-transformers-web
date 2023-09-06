import { CountPurchaseController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountPurchase } from '../..'

export const makeCountPurchaseController = (): Controller => {
	return new CountPurchaseController(makeCountPurchase())
}
