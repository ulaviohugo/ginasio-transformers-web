import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteCategory } from '@/data/usecases'

export const makeRemoteDeleteProductionCategory = () => {
	return new RemoteDeleteCategory(
		makeApiUrl('/production-categories'),
		makeAuthorizeHttpClientDecorator()
	)
}
