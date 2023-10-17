import { RemoteLoadAccessories } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadAccessories = () => {
	return new RemoteLoadAccessories(
		makeApiUrl('/accessories'),
		makeAuthorizeHttpClientDecorator()
	)
}
