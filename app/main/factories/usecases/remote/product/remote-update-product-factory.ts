import { RemoteUpdateProduct } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteUpdateProduct = () => {
	return new RemoteUpdateProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
