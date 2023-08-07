import { RemoteAddEmployee } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../http'

export const makeRemoteAddEmployee = () => {
	return new RemoteAddEmployee(makeApiUrl('/employees'), makeFetchHttpClient())
}
