import { RemoteCountSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionSales = () => {
	return new RemoteCountSale(
		makeApiUrl('/production-sales/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
