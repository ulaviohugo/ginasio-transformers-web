import { RemoteLoadCustomers } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadCustomers = () => {
	return new RemoteLoadCustomers(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
