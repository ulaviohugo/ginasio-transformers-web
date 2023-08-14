import { RemoteCountProduct } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteCountProduct = () => {
	return new RemoteCountProduct(makeApiUrl('/products/count'), makeFetchHttpClient())
}
