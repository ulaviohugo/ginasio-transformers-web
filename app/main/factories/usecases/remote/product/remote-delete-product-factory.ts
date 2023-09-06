import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteProduct } from '@/data/usecases'

export const makeRemoteDeleteProduct = () => {
	return new RemoteDeleteProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
