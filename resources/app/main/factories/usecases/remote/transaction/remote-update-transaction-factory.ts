import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateTransaction } from '@/data/usecases'

export const makeRemoteUpdateTransaction = () => {
	return new RemoteUpdateTransaction(
		makeApiUrl('/transactions'),
		makeAuthorizeHttpClientDecorator()
	)
}
