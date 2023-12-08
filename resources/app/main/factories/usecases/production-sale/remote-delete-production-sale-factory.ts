import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteSale } from '@/data/usecases'

export const makeRemoteDeleteProductionSale = () => {
	return new RemoteDeleteSale(
		makeApiUrl('/production-sales'),
		makeAuthorizeHttpClientDecorator()
	)
}
