import { RemoteCountPurchase } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteCountPurchases = () => {
	return new RemoteCountPurchase(makeApiUrl('/purchases/count'), makeFetchHttpClient())
}
