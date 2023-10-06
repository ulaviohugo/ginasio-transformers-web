import { DeletePurchaseController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeletePurchase } from '@/main/factories'

export const makeDeletePurchaseController = (): Controller => {
	return new DeletePurchaseController(
		makeDeletePurchase(),
		new NumberGreaterThanValidation('id', 0)
	)
}
