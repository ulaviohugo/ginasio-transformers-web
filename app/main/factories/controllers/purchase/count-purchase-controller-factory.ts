import { CountPurchaseController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountPurchase } from '../..'

export const makeCountPurchaseController = (): Controller => {
	return new CountPurchaseController(makeCountPurchase())
}
