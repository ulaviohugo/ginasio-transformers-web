import { CountSupplierController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountSupplier } from '@/main/factories'

export const makeCountSupplierController = (): Controller => {
	return new CountSupplierController(makeCountSupplier())
}
