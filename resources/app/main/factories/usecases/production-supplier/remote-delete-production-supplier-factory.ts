import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteSupplier } from '@/data/usecases'

export const makeRemoteDeleteProductionSupplier = () => {
	return new RemoteDeleteSupplier(
		makeApiUrl('/production-suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
