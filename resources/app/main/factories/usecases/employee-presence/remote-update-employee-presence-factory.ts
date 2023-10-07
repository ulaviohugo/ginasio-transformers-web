import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateEmployeePresence } from '@/data/usecases'

export const makeRemoteUpdateEmployeePresence = () => {
	return new RemoteUpdateEmployeePresence(
		makeApiUrl('/employee-presences'),
		makeAuthorizeHttpClientDecorator()
	)
}
