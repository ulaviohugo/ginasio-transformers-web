import { RemoteLoadCurrentUser } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadCurrentUser = () => {
	return new RemoteLoadCurrentUser(makeApiUrl('/me'), makeAuthorizeHttpClientDecorator())
}
