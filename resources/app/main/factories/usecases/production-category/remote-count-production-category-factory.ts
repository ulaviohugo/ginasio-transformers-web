import { RemoteCountCategory } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionCategories = () => {
	return new RemoteCountCategory(
		makeApiUrl('/production-categories/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
