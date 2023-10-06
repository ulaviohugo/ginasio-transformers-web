import { RemoteCountCustomer } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountCustomers = () => {
	return new RemoteCountCustomer(
		makeApiUrl('/customers/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
