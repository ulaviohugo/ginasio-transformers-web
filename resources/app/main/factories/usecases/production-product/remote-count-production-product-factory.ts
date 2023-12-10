import { RemoteCountProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionProduct = () => {
	return new RemoteCountProduct(
		makeApiUrl('/production-products/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
