import { RemoteAddSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddSale = () => {
	return new RemoteAddSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
