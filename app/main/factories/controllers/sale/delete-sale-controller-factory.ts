import { DeleteSaleController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteSale } from '@/main/factories'

export const makeDeleteSaleController = (): Controller => {
	return new DeleteSaleController(
		makeDeleteSale(),
		new NumberGreaterThanValidation('id', 0)
	)
}
