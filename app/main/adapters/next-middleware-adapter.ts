import { Controller, Middleware } from '@/app/infra/http/protocols'
import { adaptResponse, adaptRoute } from '.'

export const adaptMiddleware = async (
	middleware: Middleware,
	req: Request,
	controller: Controller
) => {
	const request = {
		accessToken: req.headers?.get('x-access-token'),
		...(req.headers || {})
	}

	const middlewareResponse = await middleware.handle(request)

	if (middlewareResponse.statusCode >= 200 && middlewareResponse.statusCode < 299) {
		Object.assign(req, middlewareResponse.body)
		return adaptRoute(controller, req)
	} else {
		return adaptResponse({
			statusCode: middlewareResponse.statusCode,
			body: { error: middlewareResponse.body.message }
		})
	}
}