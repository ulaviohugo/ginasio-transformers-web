import { Controller } from '@/infra/http/protocols'
import { makeAddPurchaseValidation } from '..'
import { makeAddPurchase } from '../..'
import { AddPurchaseController } from '@/infra/http/controllers'

export const makeAddPurchaseController = (): Controller => {
	return new AddPurchaseController(makeAddPurchase(), makeAddPurchaseValidation())
}
