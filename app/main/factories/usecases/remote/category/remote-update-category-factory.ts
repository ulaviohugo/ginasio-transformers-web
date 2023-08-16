import { RemoteUpdateCategory } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteUpdateCategory = () => {
	return new RemoteUpdateCategory(makeApiUrl('/categories'), makeFetchHttpClient())
}
