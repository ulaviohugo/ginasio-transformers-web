import { RemoteCountProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProduct = () => {
	return new RemoteCountProduct(
		makeApiUrl('/products/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
