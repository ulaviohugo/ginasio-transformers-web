import { RemoteAddCashRegister } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddCashRegister = () => {
	return new RemoteAddCashRegister(
		makeApiUrl('/cash-register'),
		makeAuthorizeHttpClientDecorator()
	)
}
