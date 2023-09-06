import { RemoteCountSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountSales = () => {
	return new RemoteCountSale(
		makeApiUrl('/sales/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
