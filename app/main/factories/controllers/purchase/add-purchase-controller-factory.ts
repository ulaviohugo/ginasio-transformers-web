import { Controller } from '@/app/infra/http/protocols'
import { makeAddPurchaseValidation } from '..'
import { makeAddPurchase } from '../..'
import { AddPurchaseController } from '@/app/infra/http/controllers'

export const makeAddPurchaseController = (): Controller => {
	return new AddPurchaseController(makeAddPurchase(), makeAddPurchaseValidation())
}
