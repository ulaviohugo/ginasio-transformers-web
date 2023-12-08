import { RemoteAddStock } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddStock = () => {
	return new RemoteAddStock(makeApiUrl('/stocks'), makeAuthorizeHttpClientDecorator())
}
