import { RemoteCountEmployeePresence } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountEmployeePresences = () => {
	return new RemoteCountEmployeePresence(
		makeApiUrl('/employee-presences/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
