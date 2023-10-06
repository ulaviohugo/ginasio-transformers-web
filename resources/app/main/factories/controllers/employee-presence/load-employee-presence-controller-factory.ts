import { LoadEmployeePresenceController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadEmployeePresence } from '@/main/factories'

export const makeLoadEmployeePresenceController = (): Controller => {
	return new LoadEmployeePresenceController(makeLoadEmployeePresence())
}
