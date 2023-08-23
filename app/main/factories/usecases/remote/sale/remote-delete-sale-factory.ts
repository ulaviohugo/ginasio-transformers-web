import { makeAuthorizeHttpClientDecorator } from '../../../decorators'
import { makeApiUrl } from '../../../http'
import { RemoteDeleteSale } from '@/app/data/usecases'

export const makeRemoteDeleteSale = () => {
	return new RemoteDeleteSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
