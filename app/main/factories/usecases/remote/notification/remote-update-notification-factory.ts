import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateNotification } from '@/data/usecases'

export const makeRemoteUpdateNotification = () => {
	return new RemoteUpdateNotification(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
