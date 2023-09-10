import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteEmployeePresence } from '@/data/usecases'

export const makeRemoteDeleteEmployeePresence = () => {
	return new RemoteDeleteEmployeePresence(
		makeApiUrl('/employee-presences'),
		makeAuthorizeHttpClientDecorator()
	)
}
