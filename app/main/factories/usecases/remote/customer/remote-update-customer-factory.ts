import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateCustomer } from '@/app/data/usecases'

export const makeRemoteUpdateCustomer = () => {
	return new RemoteUpdateCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
