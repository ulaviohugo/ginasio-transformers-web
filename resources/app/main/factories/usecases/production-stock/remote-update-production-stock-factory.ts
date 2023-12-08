import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateStock } from '@/data/usecases'

export const makeRemoteUpdateProductionStock = () => {
	return new RemoteUpdateStock(
		makeApiUrl('/production-stocks'),
		makeAuthorizeHttpClientDecorator()
	)
}
