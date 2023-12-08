import { RemoteCountStock } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountStocks = () => {
	return new RemoteCountStock(
		makeApiUrl('/stocks/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
