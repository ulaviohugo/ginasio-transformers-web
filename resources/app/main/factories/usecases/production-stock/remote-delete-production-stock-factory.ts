import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteStock } from '@/data/usecases'

export const makeRemoteDeleteProductionStock = () => {
	return new RemoteDeleteStock(
		makeApiUrl('/production-stocks'),
		makeAuthorizeHttpClientDecorator()
	)
}
