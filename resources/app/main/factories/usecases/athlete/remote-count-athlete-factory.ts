import { RemoteCountResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountAthletes = () => {
	return new RemoteCountResource(
		makeApiUrl('/athletes/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
