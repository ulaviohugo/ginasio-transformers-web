import { Controller } from '@/infra/http/protocols'
import { makeAddEmployeePresenceValidation } from '.'
import { makeAddEmployeePresence } from '@/main/factories'
import { AddEmployeePresenceController } from '@/infra/http/controllers'

export const makeAddEmployeePresenceController = (): Controller => {
	return new AddEmployeePresenceController(
		makeAddEmployeePresence(),
		makeAddEmployeePresenceValidation()
	)
}
