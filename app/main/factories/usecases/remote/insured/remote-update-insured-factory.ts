import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateInsured } from '@/data/usecases'

export const makeRemoteUpdateInsured = () => {
	return new RemoteUpdateInsured(
		makeApiUrl('/insureds'),
		makeAuthorizeHttpClientDecorator()
	)
}
