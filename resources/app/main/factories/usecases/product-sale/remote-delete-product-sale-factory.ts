import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteProductSale } from '@/data/usecases'

export const makeRemoteDeleteProductSale = () => {
	return new RemoteDeleteProductSale(
		makeApiUrl('/product-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
