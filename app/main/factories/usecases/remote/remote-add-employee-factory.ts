import { RemoteAddEmployee } from '@/app/data/usecases'
import { FetchHttpClient } from '@/app/infra/http'
import { makeApiUrl } from '../../http'

export const makeRemoteAddEmployee = () => {
	return new RemoteAddEmployee(makeApiUrl('/employees'), new FetchHttpClient())
}
