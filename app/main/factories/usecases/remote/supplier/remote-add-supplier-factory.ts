import { RemoteAddSupplier } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddSupplier = () => {
	return new RemoteAddSupplier(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
