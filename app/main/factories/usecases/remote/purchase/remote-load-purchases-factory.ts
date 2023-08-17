import { RemoteLoadPurchases } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteLoadPurchases = () => {
	return new RemoteLoadPurchases(makeApiUrl('/purchases'), makeFetchHttpClient())
}
