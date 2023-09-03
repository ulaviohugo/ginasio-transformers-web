import { RemoteCountCustomer } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountCustomers = () => {
	return new RemoteCountCustomer(
		makeApiUrl('/customers/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
