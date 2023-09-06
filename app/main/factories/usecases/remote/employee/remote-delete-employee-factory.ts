import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteEmployee } from '@/data/usecases'

export const makeRemoteDeleteEmployee = () => {
	return new RemoteDeleteEmployee(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
