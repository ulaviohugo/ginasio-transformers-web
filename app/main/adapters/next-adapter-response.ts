import { HttpResponse } from '@/app/data/protocols/http'

export const adaptResponse = ({ body, statusCode, headers }: HttpResponse) => {
	const httpResponse = typeof body == 'string' ? body : JSON.stringify(body)

	return new Response(httpResponse, {
		status: statusCode,
		headers: { ...headers, 'Content-Type': 'application/json' }
	})
}
