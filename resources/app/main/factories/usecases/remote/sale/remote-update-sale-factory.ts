import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateSale } from '@/data/usecases'

export const makeRemoteUpdateSale = () => {
	return new RemoteUpdateSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
