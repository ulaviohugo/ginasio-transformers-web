import { RemoteLoadProductSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionProductSales = () => {
	return new RemoteLoadProductSale(
		makeApiUrl('/production-product-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
