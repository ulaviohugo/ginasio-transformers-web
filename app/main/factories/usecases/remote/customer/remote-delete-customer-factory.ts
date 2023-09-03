import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteCustomer } from '@/app/data/usecases'

export const makeRemoteDeleteCustomer = () => {
	return new RemoteDeleteCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
