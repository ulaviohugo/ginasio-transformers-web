import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateEmployee } from '@/app/data/usecases'

export const makeRemoteUpdateEmployee = () => {
	return new RemoteUpdateEmployee(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
