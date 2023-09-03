import { RemoteLoadCustomers } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadCustomers = () => {
	return new RemoteLoadCustomers(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
