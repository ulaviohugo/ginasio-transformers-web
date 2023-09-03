import { RemoteLoadCurrentUser } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadCurrentUser = () => {
	return new RemoteLoadCurrentUser(makeApiUrl('/me'), makeAuthorizeHttpClientDecorator())
}
