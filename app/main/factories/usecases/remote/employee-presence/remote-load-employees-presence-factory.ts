import { RemoteLoadEmployeePresences } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadEmployeePresences = () => {
	return new RemoteLoadEmployeePresences(
		makeApiUrl('/employee-presences'),
		makeAuthorizeHttpClientDecorator()
	)
}
