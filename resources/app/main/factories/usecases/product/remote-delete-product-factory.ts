import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteProduct } from '@/data/usecases'

export const makeRemoteDeleteProduct = () => {
	return new RemoteDeleteProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
