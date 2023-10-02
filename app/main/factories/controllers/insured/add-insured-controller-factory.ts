import { Controller } from '@/infra/http/protocols'
import { makeAddInsuredValidation } from '.'
import { makeAddInsured } from '@/main/factories'
import { AddInsuredController } from '@/infra/http/controllers'

export const makeAddInsuredController = (): Controller => {
	return new AddInsuredController(makeAddInsured(), makeAddInsuredValidation())
}
