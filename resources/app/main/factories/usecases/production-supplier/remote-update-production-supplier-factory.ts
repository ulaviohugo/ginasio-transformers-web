import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateSupplier } from '@/data/usecases'

export const makeRemoteUpdateProductionSupplier = () => {
	return new RemoteUpdateSupplier(
		makeApiUrl('/production-suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
