import { RemoteAddProduct } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteAddProduct = () => {
	return new RemoteAddProduct(makeApiUrl('/products'), makeFetchHttpClient())
}
