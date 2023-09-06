import { RemoteCountNotification } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountNotifications = () => {
	return new RemoteCountNotification(
		makeApiUrl('/notifications/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
