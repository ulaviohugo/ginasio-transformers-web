import { RemoteAddTransaction } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddTransaction = () => {
	return new RemoteAddTransaction(
		makeApiUrl('/transactions'),
		makeAuthorizeHttpClientDecorator()
	)
}
