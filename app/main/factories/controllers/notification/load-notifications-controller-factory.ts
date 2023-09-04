import { LoadNotificationController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadNotifications } from '@/app/main/factories'

export const makeLoadNotificationController = (): Controller => {
	return new LoadNotificationController(makeLoadNotifications())
}
