import { DeleteInsuredController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteInsured } from '@/main/factories'

export const makeDeleteInsuredController = (): Controller => {
	return new DeleteInsuredController(
		makeDeleteInsured(),
		new NumberGreaterThanValidation('id', 0)
	)
}
