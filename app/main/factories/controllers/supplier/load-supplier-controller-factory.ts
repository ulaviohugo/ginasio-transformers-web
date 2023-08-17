import { LoadSupplierController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadSupplier } from '../..'

export const makeLoadSupplierController = (): Controller => {
	return new LoadSupplierController(makeLoadSupplier())
}
