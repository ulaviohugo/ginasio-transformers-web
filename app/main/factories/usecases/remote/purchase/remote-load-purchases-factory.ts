import { RemoteLoadPurchases } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadPurchases = () => {
	return new RemoteLoadPurchases(
		makeApiUrl('/purchases'),
		makeAuthorizeHttpClientDecorator()
	)
}
