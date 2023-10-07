import { RemoteLoadCategories } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadCategories = () => {
	return new RemoteLoadCategories(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
