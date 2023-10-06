import { UpdateTransactionController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateTransactionValidation } from '.'
import { makeUpdateTransaction } from '@/main/factories'

export const makeUpdateTransactionController = (): Controller => {
	return new UpdateTransactionController(
		makeUpdateTransaction(),
		makeUpdateTransactionValidation()
	)
}
