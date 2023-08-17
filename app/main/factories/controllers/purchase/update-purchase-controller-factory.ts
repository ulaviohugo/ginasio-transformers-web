import { UpdatePurchaseController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeUpdatePurchaseValidation } from '.'
import { makeUpdatePurchase } from '../..'

export const makeUpdatePurchaseController = (): Controller => {
	return new UpdatePurchaseController(
		makeUpdatePurchase(),
		makeUpdatePurchaseValidation()
	)
}
