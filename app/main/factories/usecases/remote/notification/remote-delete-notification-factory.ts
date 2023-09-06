import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteNotification } from '@/data/usecases'

export const makeRemoteDeleteNotification = () => {
	return new RemoteDeleteNotification(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
