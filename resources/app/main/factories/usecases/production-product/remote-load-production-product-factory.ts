import { RemoteLoadProduct } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionProduct = () => {
	return new RemoteLoadProduct(
		makeApiUrl('/production-products'),
		makeAuthorizeHttpClientDecorator()
	)
}
