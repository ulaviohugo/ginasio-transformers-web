import { RemoteCountNotification } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountNotifications = () => {
	return new RemoteCountNotification(
		makeApiUrl('/notifications/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
