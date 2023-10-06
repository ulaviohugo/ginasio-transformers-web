import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteEmployee } from '@/data/usecases'

export const makeRemoteDeleteEmployee = () => {
	return new RemoteDeleteEmployee(
		makeApiUrl('/employees'),
		makeAuthorizeHttpClientDecorator()
	)
}
