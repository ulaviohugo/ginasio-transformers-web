import { RemoteLoadCurrentUser } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadCurrentUser = () => {
	return new RemoteLoadCurrentUser(makeApiUrl('/me'), makeAuthorizeHttpClientDecorator())
}
