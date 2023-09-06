import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteCustomer } from '@/data/usecases'

export const makeRemoteDeleteCustomer = () => {
	return new RemoteDeleteCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
