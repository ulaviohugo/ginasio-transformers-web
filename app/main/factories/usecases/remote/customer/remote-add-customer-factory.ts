import { RemoteAddCustomer } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteAddCustomer = () => {
	return new RemoteAddCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
