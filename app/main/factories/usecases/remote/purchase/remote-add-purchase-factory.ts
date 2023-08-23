import { RemoteAddPurchase } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteAddPurchase = () => {
	return new RemoteAddPurchase(
		makeApiUrl('/purchases'),
		makeAuthorizeHttpClientDecorator()
	)
}
