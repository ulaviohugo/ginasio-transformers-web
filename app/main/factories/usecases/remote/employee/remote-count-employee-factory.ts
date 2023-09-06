import { RemoteCountEmployee } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountEmployees = () => {
	return new RemoteCountEmployee(
		makeApiUrl('/employees/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
