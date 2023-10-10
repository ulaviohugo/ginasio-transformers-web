import { RemoteCountProductionBudget } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteCountProductionBudgets = () => {
	return new RemoteCountProductionBudget(
		makeApiUrl('/production-budgets/count'),
		makeAuthorizeHttpClientDecorator()
	)
}
