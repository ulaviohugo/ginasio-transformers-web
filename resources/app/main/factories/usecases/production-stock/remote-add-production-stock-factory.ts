import { RemoteAddStock } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddProductionStock = () => {
	return new RemoteAddStock(
		makeApiUrl('/production-stocks'),
		makeAuthorizeHttpClientDecorator()
	)
}
