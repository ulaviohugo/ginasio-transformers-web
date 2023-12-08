import { RemoteCountSupplier } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionSuppliers = () => {
	return new RemoteCountSupplier(
		makeApiUrl('/production-suppliers/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
