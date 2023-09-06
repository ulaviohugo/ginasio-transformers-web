import { RemoteAddEmployee } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddEmployee = () => {
	return new RemoteAddEmployee(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
