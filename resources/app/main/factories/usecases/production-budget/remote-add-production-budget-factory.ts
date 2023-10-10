import { RemoteAddProductionBudget } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteAddProductionBudget = () => {
	return new RemoteAddProductionBudget(
		makeApiUrl('/production-budgets'),
		makeAuthorizeHttpClientDecorator()
	)
}
