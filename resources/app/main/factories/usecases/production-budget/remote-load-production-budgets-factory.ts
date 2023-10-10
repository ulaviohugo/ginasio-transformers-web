import { RemoteLoadProductionBudgets } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionBudgets = () => {
	return new RemoteLoadProductionBudgets(
		makeApiUrl('/production-budgets'),
		makeAuthorizeHttpClientDecorator()
	)
}
