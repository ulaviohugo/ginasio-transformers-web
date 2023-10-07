import { RemoteAuthentication } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteAuthentication = () => {
	return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
