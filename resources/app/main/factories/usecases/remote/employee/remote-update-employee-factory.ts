import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateEmployee } from '@/data/usecases'

export const makeRemoteUpdateEmployee = () => {
	return new RemoteUpdateEmployee(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
