import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdatePurchase } from '@/data/usecases'

export const makeRemoteUpdatePurchase = () => {
	return new RemoteUpdatePurchase(
		makeApiUrl('/stocks'),
		makeAuthorizeHttpClientDecorator()
	)
}
