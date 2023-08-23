import { RemoteLoadPurchases } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadPurchases = () => {
	return new RemoteLoadPurchases(
		makeApiUrl('/purchases'),
		makeAuthorizeHttpClientDecorator()
	)
}
