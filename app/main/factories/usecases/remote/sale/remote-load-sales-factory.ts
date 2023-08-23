import { RemoteLoadSale } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadSales = () => {
	return new RemoteLoadSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
