import { CountEmployeeController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountEmployee } from '@/main/factories'

export const makeCountEmployeeController = (): Controller => {
	return new CountEmployeeController(makeCountEmployee())
}
