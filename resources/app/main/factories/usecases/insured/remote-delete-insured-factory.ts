import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteInsured } from '@/data/usecases'

export const makeRemoteDeleteInsured = () => {
	return new RemoteDeleteInsured(
		makeApiUrl('/insureds'),
		makeAuthorizeHttpClientDecorator()
	)
}
