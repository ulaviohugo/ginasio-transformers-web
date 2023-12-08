import { RemoteLoadCategories } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionCategories = () => {
	return new RemoteLoadCategories(
		makeApiUrl('/production-categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
