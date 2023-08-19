import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteUpdateSale } from '@/app/data/usecases'

export const makeRemoteUpdateSale = () => {
	return new RemoteUpdateSale(makeApiUrl('/sales'), makeFetchHttpClient())
}
