import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteUpdateEmployee } from '@/app/data/usecases'

export const makeRemoteUpdateEmployee = () => {
	return new RemoteUpdateEmployee(makeApiUrl('/employees'), makeFetchHttpClient())
}
