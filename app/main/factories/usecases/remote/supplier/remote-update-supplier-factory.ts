import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateSupplier } from '@/app/data/usecases'

export const makeRemoteUpdateSupplier = () => {
	return new RemoteUpdateSupplier(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
