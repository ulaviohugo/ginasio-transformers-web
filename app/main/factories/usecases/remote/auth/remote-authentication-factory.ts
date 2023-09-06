import { RemoteAuthentication } from '@/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteAuthentication = () => {
	return new RemoteAuthentication(makeApiUrl('/login'), makeFetchHttpClient())
}
