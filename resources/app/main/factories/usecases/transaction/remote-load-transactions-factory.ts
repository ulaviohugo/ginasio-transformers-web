import { RemoteLoadTransactions } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadTransactions = () => {
	return new RemoteLoadTransactions(
		makeApiUrl('/transactions'),
		makeAuthorizeHttpClientDecorator()
	)
}
