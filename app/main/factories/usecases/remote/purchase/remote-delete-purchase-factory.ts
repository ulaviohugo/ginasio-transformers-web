import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeletePurchase } from '@/data/usecases'

export const makeRemoteDeletePurchase = () => {
	return new RemoteDeletePurchase(
		makeApiUrl('/purchases'),
		makeAuthorizeHttpClientDecorator()
	)
}
