import { RemoteAddEmployeePresence } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddEmployeePresence = () => {
	return new RemoteAddEmployeePresence(
		makeApiUrl('/employee-presences'),
		makeAuthorizeHttpClientDecorator()
	)
}
