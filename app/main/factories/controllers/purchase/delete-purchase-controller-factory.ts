import { DeletePurchaseController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeletePurchase } from '../..'

export const makeDeletePurchaseController = (): Controller => {
	return new DeletePurchaseController(
		makeDeletePurchase(),
		new NumberGreaterThanValidation('id', 0)
	)
}
