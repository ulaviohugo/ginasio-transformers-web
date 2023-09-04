import { RemoteAddNotification } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteAddNotification = () => {
	return new RemoteAddNotification(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
