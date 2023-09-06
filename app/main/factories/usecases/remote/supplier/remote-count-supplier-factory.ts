import { RemoteCountSupplier } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountSuppliers = () => {
	return new RemoteCountSupplier(
		makeApiUrl('/suppliers/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
