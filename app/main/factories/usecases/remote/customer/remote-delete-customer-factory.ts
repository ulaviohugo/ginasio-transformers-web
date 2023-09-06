import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteCustomer } from '@/data/usecases'

export const makeRemoteDeleteCustomer = () => {
	return new RemoteDeleteCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
