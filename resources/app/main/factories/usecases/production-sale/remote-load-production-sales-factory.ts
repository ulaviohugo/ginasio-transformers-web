import { RemoteLoadSale } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadProductionSales } from '@/domain/usecases'

export const makeRemoteLoadProductionSales = (): LoadProductionSales => {
	return new RemoteLoadSale(
		makeApiUrl('/production-sales'),
		makeAuthorizeHttpClientDecorator()
	) as any
}
