import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateStock } from '@/data/usecases'

export const makeRemoteUpdateStock = () => {
	return new RemoteUpdateStock(makeApiUrl('/stocks'), makeAuthorizeHttpClientDecorator())
}
