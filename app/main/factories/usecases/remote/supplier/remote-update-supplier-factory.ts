import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateSupplier } from '@/data/usecases'

export const makeRemoteUpdateSupplier = () => {
	return new RemoteUpdateSupplier(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
