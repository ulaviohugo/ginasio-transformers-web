import { LoadNotificationController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadNotifications } from '@/main/factories'

export const makeLoadNotificationController = (): Controller => {
	return new LoadNotificationController(makeLoadNotifications())
}
