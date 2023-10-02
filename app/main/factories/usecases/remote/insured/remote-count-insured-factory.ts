import { RemoteCountInsured } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountInsureds = () => {
	return new RemoteCountInsured(
		makeApiUrl('/insureds/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
