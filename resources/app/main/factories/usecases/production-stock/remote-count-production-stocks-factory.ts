import { RemoteCountStock } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionStocks = () => {
	return new RemoteCountStock(
		makeApiUrl('/production-stocks/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
