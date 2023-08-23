import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdatePurchase } from '@/app/data/usecases'

export const makeRemoteUpdatePurchase = () => {
	return new RemoteUpdatePurchase(
		makeApiUrl('/purchases'),
		makeAuthorizeHttpClientDecorator()
	)
}
