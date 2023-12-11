import { RemoteCountProductSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionProductSales = () => {
	return new RemoteCountProductSale(
		makeApiUrl('/production-product-sales/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
