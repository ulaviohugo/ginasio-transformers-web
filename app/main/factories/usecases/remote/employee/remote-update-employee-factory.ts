import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteUpdateEmployee } from '@/app/data/usecases'

export const makeRemoteAUpdateEmployee = () => {
	return new RemoteUpdateEmployee(makeApiUrl('/employees'), makeFetchHttpClient())
}
