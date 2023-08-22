import { Middleware } from '@/app/infra/http/protocols'
import { adaptResponse } from '.'

export const adaptMiddleware = async (
	middleware: Middleware,
	next: (request: Request) => any,
	req: Request
) => {
	const request = {
		accessToken: req.headers?.get('x-access-token'),
		...(req.headers || {})
	}

	const httpResponse = await middleware.handle(request)

	if (httpResponse.statusCode === 200) {
		Object.assign(req, httpResponse.body)
		return next(req)
	} else {
		return adaptResponse({
			statusCode: httpResponse.statusCode,
			body: { error: httpResponse.body.message }
		})
	}
}
