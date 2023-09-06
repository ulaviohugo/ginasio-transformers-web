import {
	HeaderParams,
	HttpClient,
	HttpRequestParams,
	HttpResponse,
	HttpStatusCode
} from '@/data/protocols/http'

export class FetchHttpClient implements HttpClient {
	async request(data: HttpRequestParams): Promise<HttpResponse> {
		let fetchResponse
		let errorStatus: { code: number; text: string } = {} as any
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
			errorStatus = { code: httpResponse.status, text: httpResponse.statusText }
			const jsonBody = await httpResponse.json()
			fetchResponse = {
				data: httpResponse.status == HttpStatusCode.ok ? jsonBody : jsonBody?.error,
				status: httpResponse.status
			}
		} catch (error: any) {
			fetchResponse = error.response ?? {
				data: errorStatus.text,
				status: errorStatus.code
			}
		}
		return {
			statusCode: fetchResponse.status,
			body: fetchResponse.data
		}
	}
}
