import { RemoteLoadNotifications } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadNotifications = () => {
	return new RemoteLoadNotifications(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
