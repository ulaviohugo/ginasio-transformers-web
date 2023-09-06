import { RemoteLoadProduct } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadProduct = () => {
	return new RemoteLoadProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
