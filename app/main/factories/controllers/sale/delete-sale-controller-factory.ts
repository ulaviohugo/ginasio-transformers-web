import { DeleteSaleController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/app/validation/validators'
import { makeDeleteSale } from '../..'

export const makeDeleteSaleController = (): Controller => {
	return new DeleteSaleController(
		makeDeleteSale(),
		new NumberGreaterThanValidation('id', 0)
	)
}
