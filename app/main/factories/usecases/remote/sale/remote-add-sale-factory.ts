import { RemoteAddSale } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteAddSale = () => {
	return new RemoteAddSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
