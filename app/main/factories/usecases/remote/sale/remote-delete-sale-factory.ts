import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteSale } from '@/data/usecases'

export const makeRemoteDeleteSale = () => {
	return new RemoteDeleteSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
