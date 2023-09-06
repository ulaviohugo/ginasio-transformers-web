import { RemoteUpdateCategory } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteUpdateCategory = () => {
	return new RemoteUpdateCategory(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
