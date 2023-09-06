import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateEmployee } from '@/data/usecases'

export const makeRemoteUpdateEmployee = () => {
	return new RemoteUpdateEmployee(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
