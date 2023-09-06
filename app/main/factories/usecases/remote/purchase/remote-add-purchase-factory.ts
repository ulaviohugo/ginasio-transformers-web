import { RemoteAddPurchase } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddPurchase = () => {
	return new RemoteAddPurchase(
		makeApiUrl('/purchases'),
		makeAuthorizeHttpClientDecorator()
	)
}
