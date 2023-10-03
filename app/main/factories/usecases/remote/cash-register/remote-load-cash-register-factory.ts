import { RemoteLoadCashRegister } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadCashRegister = () => {
	return new RemoteLoadCashRegister(
		makeApiUrl('/cash-register'),
		makeAuthorizeHttpClientDecorator()
	)
}
