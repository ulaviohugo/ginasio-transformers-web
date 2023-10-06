import { RemoteLoadEmployees } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadEmployees = () => {
	return new RemoteLoadEmployees(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
