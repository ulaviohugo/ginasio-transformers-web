import { RemoteLoadCategories } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadCategories = () => {
	return new RemoteLoadCategories(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
