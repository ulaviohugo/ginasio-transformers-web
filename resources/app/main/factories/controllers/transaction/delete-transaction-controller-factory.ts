import { DeleteTransactionController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteTransaction } from '@/main/factories'

export const makeDeleteTransactionController = (): Controller => {
	return new DeleteTransactionController(
		makeDeleteTransaction(),
		new NumberGreaterThanValidation('id', 0)
	)
}
