import { RemoteAddProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddProduct = () => {
	return new RemoteAddProduct(makeApiUrl('/products'), makeAuthorizeHttpClientDecorator())
}
