import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteNotification } from '@/data/usecases'

export const makeRemoteDeleteNotification = () => {
	return new RemoteDeleteNotification(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
