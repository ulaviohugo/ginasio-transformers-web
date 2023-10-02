import { RemoteAddInsured } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddInsured = () => {
	return new RemoteAddInsured(makeApiUrl('/insureds'), makeAuthorizeHttpClientDecorator())
}
