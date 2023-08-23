import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteUpdateSale } from '@/app/data/usecases'

export const makeRemoteUpdateSale = () => {
	return new RemoteUpdateSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
