import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateSale } from '@/data/usecases'

export const makeRemoteUpdateProductionSale = () => {
	return new RemoteUpdateSale(
		makeApiUrl('/production-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
