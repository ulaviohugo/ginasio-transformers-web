import { RemoteLoadInsureds } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadInsureds = () => {
	return new RemoteLoadInsureds(
		makeApiUrl('/insureds'),
		makeAuthorizeHttpClientDecorator()
	)
}
