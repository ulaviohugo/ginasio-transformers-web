import { Controller } from '@/infra/http/protocols'
import { makeAddTransactionValidation } from '.'
import { makeAddTransaction } from '@/main/factories'
import { AddTransactionController } from '@/infra/http/controllers'

export const makeAddTransactionController = (): Controller => {
	return new AddTransactionController(
		makeAddTransaction(),
		makeAddTransactionValidation()
	)
}
