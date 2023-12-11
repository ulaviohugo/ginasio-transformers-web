import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteProductSale } from '@/data/usecases'

export const makeRemoteDeleteProductionProductSale = () => {
	return new RemoteDeleteProductSale(
		makeApiUrl('/production-product-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
