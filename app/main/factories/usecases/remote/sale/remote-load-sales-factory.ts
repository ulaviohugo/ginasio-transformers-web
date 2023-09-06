import { RemoteLoadSale } from '@/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadSales = () => {
	return new RemoteLoadSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
