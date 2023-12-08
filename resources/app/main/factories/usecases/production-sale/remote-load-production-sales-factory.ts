import { RemoteLoadSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionSales = () => {
	return new RemoteLoadSale(
		makeApiUrl('/production-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
