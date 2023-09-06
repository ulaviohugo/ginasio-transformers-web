import { RemoteUpdateCategory } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'

export const makeRemoteUpdateCategory = () => {
	return new RemoteUpdateCategory(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
