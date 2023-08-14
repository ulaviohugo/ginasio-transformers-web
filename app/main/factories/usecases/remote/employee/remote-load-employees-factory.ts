import { RemoteLoadEmployees } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteLoadEmployees = () => {
	return new RemoteLoadEmployees(makeApiUrl('/employees'), makeFetchHttpClient())
}
