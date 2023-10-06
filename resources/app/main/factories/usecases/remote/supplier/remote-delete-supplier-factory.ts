import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteSupplier } from '@/data/usecases'

export const makeRemoteDeleteSupplier = () => {
	return new RemoteDeleteSupplier(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
