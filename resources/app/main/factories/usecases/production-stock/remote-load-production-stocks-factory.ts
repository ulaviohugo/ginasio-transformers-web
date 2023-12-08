import { RemoteLoadStocks } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionStocks = () => {
	return new RemoteLoadStocks(
		makeApiUrl('/production-stocks'),
		makeAuthorizeHttpClientDecorator()
	)
}
