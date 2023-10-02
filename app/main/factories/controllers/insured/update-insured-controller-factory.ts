import { UpdateInsuredController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateInsuredValidation } from '.'
import { makeUpdateInsured } from '@/main/factories'

export const makeUpdateInsuredController = (): Controller => {
	return new UpdateInsuredController(makeUpdateInsured(), makeUpdateInsuredValidation())
}
