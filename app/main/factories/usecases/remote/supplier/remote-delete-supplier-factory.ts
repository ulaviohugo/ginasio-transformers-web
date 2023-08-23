import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteSupplier } from '@/app/data/usecases'

export const makeRemoteDeleteSupplier = () => {
	return new RemoteDeleteSupplier(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
