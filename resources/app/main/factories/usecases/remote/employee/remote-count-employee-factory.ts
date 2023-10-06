import { RemoteCountEmployee } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountEmployees = () => {
	return new RemoteCountEmployee(
		makeApiUrl('/employees/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
