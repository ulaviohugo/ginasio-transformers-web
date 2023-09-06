import { RemoteAddProduct } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteAddProduct = () => {
	return new RemoteAddProduct(makeApiUrl('/products'), makeAuthorizeHttpClientDecorator())
}
