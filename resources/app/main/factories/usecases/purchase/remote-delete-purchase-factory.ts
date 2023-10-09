import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeletePurchase } from '@/data/usecases'

export const makeRemoteDeletePurchase = () => {
	return new RemoteDeletePurchase(
		makeApiUrl('/stocks'),
		makeAuthorizeHttpClientDecorator()
	)
}
