import { makeApiUrl, makeFetchHttpClient } from '../../http'
import { RemoteDeleteEmployee } from '@/app/data/usecases'

export const makeRemoteADeleteEmployee = () => {
	return new RemoteDeleteEmployee(makeApiUrl('/employees'), makeFetchHttpClient())
}
