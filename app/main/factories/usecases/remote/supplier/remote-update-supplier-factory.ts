import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteUpdateSupplier } from '@/app/data/usecases'

export const makeRemoteUpdateSupplier = () => {
	return new RemoteUpdateSupplier(makeApiUrl('/suppliers'), makeFetchHttpClient())
}
