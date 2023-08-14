import { RemoteCountEmployee } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteCountEmployees = () => {
	return new RemoteCountEmployee(makeApiUrl('/employees/count'), makeFetchHttpClient())
}
