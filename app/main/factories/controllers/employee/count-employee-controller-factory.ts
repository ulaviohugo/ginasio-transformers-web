import { CountEmployeeController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeCountEmployee } from '../..'

export const makeCountEmployeeController = (): Controller => {
	return new CountEmployeeController(makeCountEmployee())
}
