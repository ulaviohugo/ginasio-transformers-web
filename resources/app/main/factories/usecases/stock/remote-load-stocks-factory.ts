import { RemoteLoadStocks } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadStocks = () => {
	return new RemoteLoadStocks(makeApiUrl('/stocks'), makeAuthorizeHttpClientDecorator())
}
