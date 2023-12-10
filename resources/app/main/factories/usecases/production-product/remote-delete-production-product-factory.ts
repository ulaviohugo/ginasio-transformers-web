import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteProduct } from '@/data/usecases'

export const makeRemoteDeleteProductionProduct = () => {
	return new RemoteDeleteProduct(
		makeApiUrl('/production-products'),
		makeAuthorizeHttpClientDecorator()
	)
}
