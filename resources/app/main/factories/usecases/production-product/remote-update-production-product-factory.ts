import { RemoteUpdateProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteUpdateProductionProduct = () => {
	return new RemoteUpdateProduct(
		makeApiUrl('/products'),
		makeAuthorizeHttpClientDecorator()
	)
}
