import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateCustomer } from '@/data/usecases'

export const makeRemoteUpdateCustomer = () => {
	return new RemoteUpdateCustomer(
		makeApiUrl('/customers'),
		makeAuthorizeHttpClientDecorator()
	)
}
