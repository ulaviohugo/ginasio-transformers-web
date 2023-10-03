import { Controller } from '@/infra/http/protocols'
import { makeAddCashRegisterValidation } from '.'
import { AddCashRegisterController } from '@/infra/http/controllers'
import {
	makeAddCashRegister,
	makeLoadCashRegister,
	makeUpdateCashRegister
} from '@/main/factories'

export const makeAddCashRegisterController = (): Controller => {
	return new AddCashRegisterController(
		makeAddCashRegister(),
		makeAddCashRegisterValidation(),
		makeLoadCashRegister(),
		makeUpdateCashRegister()
	)
}
