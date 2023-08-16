import { makeApiUrl, makeFetchHttpClient } from '../../../http'
import { RemoteDeleteCategory } from '@/app/data/usecases'

export const makeRemoteDeleteCategory = () => {
	return new RemoteDeleteCategory(makeApiUrl('/categories'), makeFetchHttpClient())
}
