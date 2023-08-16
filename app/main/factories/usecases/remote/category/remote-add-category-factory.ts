import { RemoteAddCategory } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteAddCategory = () => {
	return new RemoteAddCategory(makeApiUrl('/categories'), makeFetchHttpClient())
}
