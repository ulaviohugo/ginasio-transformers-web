import { RemoteUpdateProduct } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteUpdateProduct = () => {
	return new RemoteUpdateProduct(makeApiUrl('/products'), makeFetchHttpClient())
}
