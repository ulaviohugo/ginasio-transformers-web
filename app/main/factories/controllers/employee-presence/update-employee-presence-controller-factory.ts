import { UpdateEmployeePresenceController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeUpdateEmployeePresenceValidation } from '.'
import { makeUpdateEmployeePresence } from '@/main/factories'

export const makeUpdateEmployeePresenceController = (): Controller => {
	return new UpdateEmployeePresenceController(
		makeUpdateEmployeePresence(),
		makeUpdateEmployeePresenceValidation()
	)
}
