import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteStock } from '@/data/usecases'

export const makeRemoteDeleteStock = () => {
	return new RemoteDeleteStock(makeApiUrl('/stocks'), makeAuthorizeHttpClientDecorator())
}
