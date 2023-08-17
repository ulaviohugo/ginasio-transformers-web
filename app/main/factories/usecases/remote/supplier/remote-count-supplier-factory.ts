import { RemoteCountSupplier } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteCountSuppliers = () => {
	return new RemoteCountSupplier(makeApiUrl('/suppliers/count'), makeFetchHttpClient())
}
