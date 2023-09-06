import { RemoteCountSupplier } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountSuppliers = () => {
	return new RemoteCountSupplier(
		makeApiUrl('/suppliers/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
