import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateCustomer } from '@/data/usecases'

export const makeRemoteUpdateCustomer = () => {
	return new RemoteUpdateCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
