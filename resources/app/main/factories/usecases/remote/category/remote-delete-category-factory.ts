import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteCategory } from '@/data/usecases'

export const makeRemoteDeleteCategory = () => {
	return new RemoteDeleteCategory(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
