import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteDeleteEmployee } from '@/app/data/usecases'

export const makeRemoteDeleteEmployee = () => {
	return new RemoteDeleteEmployee(makeApiUrl('/employees'), makeFetchHttpClient())
}
