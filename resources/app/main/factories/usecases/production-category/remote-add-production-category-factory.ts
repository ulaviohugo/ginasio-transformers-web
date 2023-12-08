import { RemoteAddCategory } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddProductionCategory = () => {
	return new RemoteAddCategory(
		makeApiUrl('/production-categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
