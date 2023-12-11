import { RemoteLoadProductSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductSales = () => {
	return new RemoteLoadProductSale(
		makeApiUrl('/product-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
