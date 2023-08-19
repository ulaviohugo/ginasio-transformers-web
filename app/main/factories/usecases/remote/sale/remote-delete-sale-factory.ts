import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteDeleteSale } from '@/app/data/usecases'

export const makeRemoteDeleteSale = () => {
	return new RemoteDeleteSale(makeApiUrl('/sales'), makeFetchHttpClient())
}
