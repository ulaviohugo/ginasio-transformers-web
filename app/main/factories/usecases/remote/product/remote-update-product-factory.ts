import { RemoteUpdateProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteUpdateProduct = () => {
	return new RemoteUpdateProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
