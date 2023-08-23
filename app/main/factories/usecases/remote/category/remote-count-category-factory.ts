import { RemoteCountCategory } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountCategories = () => {
	return new RemoteCountCategory(
		makeApiUrl('/categories/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
