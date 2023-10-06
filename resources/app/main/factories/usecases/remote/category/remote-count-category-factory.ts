import { RemoteCountCategory } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountCategories = () => {
	return new RemoteCountCategory(
		makeApiUrl('/categories/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
