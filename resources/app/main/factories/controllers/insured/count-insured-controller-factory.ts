import { CountInsuredController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountInsured } from '@/main/factories'

export const makeCountInsuredController = (): Controller => {
	return new CountInsuredController(makeCountInsured())
}
