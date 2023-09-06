import { RemoteCountProduct } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountProduct = () => {
	return new RemoteCountProduct(
		makeApiUrl('/products/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
