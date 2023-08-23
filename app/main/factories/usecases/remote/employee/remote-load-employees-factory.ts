import { RemoteLoadEmployees } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadEmployees = () => {
	return new RemoteLoadEmployees(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
