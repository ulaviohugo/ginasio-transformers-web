import { RemoteCountProductSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductSales = () => {
	return new RemoteCountProductSale(
		makeApiUrl('/product-sales/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
