import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateSale } from '@/data/usecases'

export const makeRemoteUpdateSale = () => {
	return new RemoteUpdateSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
