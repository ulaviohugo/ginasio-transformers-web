import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateProductSale } from '@/data/usecases'

export const makeRemoteUpdateProductSale = () => {
	return new RemoteUpdateProductSale(
		makeApiUrl('/product-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
