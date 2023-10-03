import { LoadTransactionsController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadTransactions } from '@/main/factories'

export const makeLoadTransactionsController = (): Controller => {
	return new LoadTransactionsController(makeLoadTransactions())
}
