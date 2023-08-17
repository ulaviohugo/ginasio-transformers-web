import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteDeleteSupplier } from '@/app/data/usecases'

export const makeRemoteDeleteSupplier = () => {
	return new RemoteDeleteSupplier(makeApiUrl('/suppliers'), makeFetchHttpClient())
}
