import { UpdatePurchaseController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdatePurchaseValidation } from '.'
import { makeUpdatePurchase } from '@/main/factories'

export const makeUpdatePurchaseController = (): Controller => {
	return new UpdatePurchaseController(
		makeUpdatePurchase(),
		makeUpdatePurchaseValidation()
	)
}
