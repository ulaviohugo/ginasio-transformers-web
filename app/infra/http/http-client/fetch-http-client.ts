import {
	HeaderParams,
	HttpClient,
	HttpRequestParams,
	HttpResponse,
	HttpStatusCode
} from '@/app/data/protocols/http'

export class FetchHttpClient implements HttpClient {
	async request(data: HttpRequestParams): Promise<HttpResponse> {
		let fetchResponse
		try {
			const headers = data.headers || ({} as HeaderParams)

			const body =
				headers['Content-Type'] == 'application/json'
					? JSON.stringify(data.body)
					: data.body

			const httpResponse = await fetch(data.url, {
				method: data.method,
				body,
				headers
			})
			const jsonBody = await httpResponse.json()
			fetchResponse = {
				data: httpResponse.status == HttpStatusCode.ok ? jsonBody : jsonBody?.error,
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
