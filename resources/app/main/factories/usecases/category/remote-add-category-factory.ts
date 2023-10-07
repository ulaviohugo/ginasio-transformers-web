import { RemoteAddCategory } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddCategory = () => {
	return new RemoteAddCategory(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
