import { RemoteAddSupplier } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteAddSupplier = () => {
	return new RemoteAddSupplier(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
