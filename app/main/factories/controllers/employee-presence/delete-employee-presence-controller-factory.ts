import { DeleteEmployeePresenceController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { NumberGreaterThanValidation } from '@/validation/validators'
import { makeDeleteEmployeePresence } from '@/main/factories'

export const makeDeleteEmployeePresenceController = (): Controller => {
	return new DeleteEmployeePresenceController(
		makeDeleteEmployeePresence(),
		new NumberGreaterThanValidation('id', 0)
	)
}
