import { RemoteLoadCategories } from '@/app/data/usecases'
import { makeApiUrl, makeFetchHttpClient } from '../../../http'

export const makeRemoteLoadCategories = () => {
	return new RemoteLoadCategories(makeApiUrl('/categories'), makeFetchHttpClient())
}
