import { CountPurchaseController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountPurchase } from '@/main/factories'

export const makeCountPurchaseController = (): Controller => {
	return new CountPurchaseController(makeCountPurchase())
}
