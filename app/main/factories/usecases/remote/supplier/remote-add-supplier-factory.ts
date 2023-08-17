import { RemoteAddSupplier } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteAddSupplier = () => {
	return new RemoteAddSupplier(makeApiUrl('/suppliers'), makeFetchHttpClient())
}
