import { RemoteLoadSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadSales = () => {
	return new RemoteLoadSale(makeApiUrl('/sales'), makeAuthorizeHttpClientDecorator())
}
