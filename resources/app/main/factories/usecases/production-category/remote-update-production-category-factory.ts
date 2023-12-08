import { RemoteUpdateCategory } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteUpdateProductionCategory = () => {
	return new RemoteUpdateCategory(
		makeApiUrl('/production-categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
