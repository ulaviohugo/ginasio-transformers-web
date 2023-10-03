import { CountTransactionController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountTransaction } from '@/main/factories'

export const makeCountTransactionController = (): Controller => {
	return new CountTransactionController(makeCountTransaction())
}
