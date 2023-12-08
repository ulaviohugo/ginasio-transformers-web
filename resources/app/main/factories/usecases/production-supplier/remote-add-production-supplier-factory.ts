import { RemoteAddSupplier } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddProductionSupplier = () => {
	return new RemoteAddSupplier(
		makeApiUrl('/production-suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
