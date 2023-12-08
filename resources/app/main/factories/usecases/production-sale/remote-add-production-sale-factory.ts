import { RemoteAddSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddProductionSale = () => {
	return new RemoteAddSale(
		makeApiUrl('/production-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
