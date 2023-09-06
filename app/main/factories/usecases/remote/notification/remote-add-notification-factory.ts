import { RemoteAddNotification } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddNotification = () => {
	return new RemoteAddNotification(
		makeApiUrl('/notifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
