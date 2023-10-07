import { RemoteLoadProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProduct = () => {
	return new RemoteLoadProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
