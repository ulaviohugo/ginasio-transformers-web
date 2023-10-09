import { RemoteCountPurchase } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountPurchases = () => {
	return new RemoteCountPurchase(
		makeApiUrl('/stocks/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
