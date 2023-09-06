import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteCategory } from '@/data/usecases'

export const makeRemoteDeleteCategory = () => {
	return new RemoteDeleteCategory(
		makeApiUrl('/categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
