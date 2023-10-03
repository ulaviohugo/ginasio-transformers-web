import { LoadCashRegisterController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadCashRegister } from '@/main/factories'

export const makeLoadCashRegisterController = (): Controller => {
	return new LoadCashRegisterController(makeLoadCashRegister())
}
