import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteDeleteProduct } from '@/app/data/usecases'

export const makeRemoteDeleteProduct = () => {
	return new RemoteDeleteProduct(makeApiUrl('/products'), makeFetchHttpClient())
}
