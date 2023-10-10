import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteProductionBudget } from '@/data/usecases'

export const makeRemoteDeleteProductionBudget = () => {
	return new RemoteDeleteProductionBudget(
		makeApiUrl('/production-budgets'),
		makeAuthorizeHttpClientDecorator()
	)
}
