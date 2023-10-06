import { HttpStatusCode } from '@/data/protocols/http'
import { adaptResponse } from '@/main/adapters'

export class RouteUtils {
	static notFound() {
		return adaptResponse({
			statusCode: HttpStatusCode.notFound,
			body: { error: 'Rota não encontrada' }
		})
	}
}
