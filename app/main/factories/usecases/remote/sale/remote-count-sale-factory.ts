import { RemoteCountSale } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteCountSales = () => {
	return new RemoteCountSale(makeApiUrl('/sales/count'), makeFetchHttpClient())
}
