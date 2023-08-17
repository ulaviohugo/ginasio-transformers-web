import { RemoteLoadSuppliers } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteLoadSuppliers = () => {
	return new RemoteLoadSuppliers(makeApiUrl('/suppliers'), makeFetchHttpClient())
}
