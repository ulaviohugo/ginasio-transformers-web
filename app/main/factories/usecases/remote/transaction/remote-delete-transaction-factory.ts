import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteTransaction } from '@/data/usecases'

export const makeRemoteDeleteTransaction = () => {
	return new RemoteDeleteTransaction(
		makeApiUrl('/transactions'),
		makeAuthorizeHttpClientDecorator()
	)
}
