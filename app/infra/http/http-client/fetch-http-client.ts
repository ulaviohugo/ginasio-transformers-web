import {
	HttpClient,
	HttpRequestParams,
	HttpResponse,
	HttpStatusCode
} from '@/app/data/protocols/http'

export class FetchHttpClient implements HttpClient {
	async request(data: HttpRequestParams): Promise<HttpResponse> {
		let fetchResponse
		try {
			const httpResponse = await fetch(data.url, {
				method: data.method,
				body: JSON.stringify(data.body),
				headers: { ...data.headers, 'Content-Type': 'application/json' }
			})
			const body = await httpResponse.json()
			fetchResponse = {
				data: httpResponse.status == HttpStatusCode.ok ? body : body?.error,
				status: httpResponse.status
			}
		} catch (error: any) {
			fetchResponse = error.response
		}
		return {
			statusCode: fetchResponse.status,
			body: fetchResponse.data
		}
	}
}
