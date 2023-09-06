import { RemoteCountPurchase } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountPurchases = () => {
	return new RemoteCountPurchase(
		makeApiUrl('/purchases/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
