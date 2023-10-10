import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateProductionBudget } from '@/data/usecases'

export const makeRemoteUpdateProductionBudget = () => {
	return new RemoteUpdateProductionBudget(
		makeApiUrl('/production-budgets'),
		makeAuthorizeHttpClientDecorator()
	)
}
