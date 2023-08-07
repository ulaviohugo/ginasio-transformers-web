import { FetchHttpClient } from '@/app/infra/http'
import { makeApiUrl } from '../../http'
import { RemoteUpdateEmployee } from '@/app/data/usecases'

export const makeRemoteAUpdateEmployee = () => {
	return new RemoteUpdateEmployee(makeApiUrl('/employees'), new FetchHttpClient())
}
