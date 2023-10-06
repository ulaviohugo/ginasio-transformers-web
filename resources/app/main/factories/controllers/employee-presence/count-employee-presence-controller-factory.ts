import { CountEmployeePresenceController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeCountEmployeePresence } from '@/main/factories'

export const makeCountEmployeePresenceController = (): Controller => {
	return new CountEmployeePresenceController(makeCountEmployeePresence())
}
