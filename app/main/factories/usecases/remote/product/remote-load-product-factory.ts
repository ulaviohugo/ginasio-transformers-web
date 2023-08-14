import { RemoteLoadProduct } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteLoadProduct = () => {
	return new RemoteLoadProduct(makeApiUrl('/products'), makeFetchHttpClient())
}
