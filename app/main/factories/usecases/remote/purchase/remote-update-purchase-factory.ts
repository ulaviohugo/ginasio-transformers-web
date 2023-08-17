import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteUpdatePurchase } from '@/app/data/usecases'

export const makeRemoteUpdatePurchase = () => {
	return new RemoteUpdatePurchase(makeApiUrl('/purchases'), makeFetchHttpClient())
}
