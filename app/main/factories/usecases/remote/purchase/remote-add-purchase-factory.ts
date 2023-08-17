import { RemoteAddPurchase } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteAddPurchase = () => {
	return new RemoteAddPurchase(makeApiUrl('/purchases'), makeFetchHttpClient())
}
