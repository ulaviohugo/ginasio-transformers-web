import { RemoteLoadSale } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteLoadSales = () => {
	return new RemoteLoadSale(makeApiUrl('/sales'), makeFetchHttpClient())
}
