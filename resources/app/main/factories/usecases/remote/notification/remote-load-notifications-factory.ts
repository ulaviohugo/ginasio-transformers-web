import { RemoteLoadNotifications } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadNotifications = () => {
	return new RemoteLoadNotifications(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
