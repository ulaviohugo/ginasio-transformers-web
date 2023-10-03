import { RemoteCountTransaction } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountTransactions = () => {
	return new RemoteCountTransaction(
		makeApiUrl('/transactions/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
