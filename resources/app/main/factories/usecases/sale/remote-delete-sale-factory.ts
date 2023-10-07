import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteSale } from '@/data/usecases'

export const makeRemoteDeleteSale = () => {
	return new RemoteDeleteSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
