import { RemoteCountSale } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteCountSales = () => {
	return new RemoteCountSale(
		makeApiUrl('/sales/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
