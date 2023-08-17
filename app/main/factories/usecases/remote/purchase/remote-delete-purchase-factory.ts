import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteDeletePurchase } from '@/app/data/usecases'

export const makeRemoteDeletePurchase = () => {
	return new RemoteDeletePurchase(makeApiUrl('/purchases'), makeFetchHttpClient())
}
