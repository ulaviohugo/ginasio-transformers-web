import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateProductSale } from '@/data/usecases'

export const makeRemoteUpdateProductionProductSale = () => {
	return new RemoteUpdateProductSale(
		makeApiUrl('/production-product-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
