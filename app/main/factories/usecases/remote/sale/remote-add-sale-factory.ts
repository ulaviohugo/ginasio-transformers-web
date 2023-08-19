import { RemoteAddSale } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteAddSale = () => {
	return new RemoteAddSale(makeApiUrl('/sales'), makeFetchHttpClient())
}
