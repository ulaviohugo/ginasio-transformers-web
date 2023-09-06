import { LoadSupplierController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadSupplier } from '../..'

export const makeLoadSupplierController = (): Controller => {
	return new LoadSupplierController(makeLoadSupplier())
}
