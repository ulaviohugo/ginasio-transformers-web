import { RemoteCountCategory } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteCountCategories = () => {
	return new RemoteCountCategory(makeApiUrl('/categories/count'), makeFetchHttpClient())
}
