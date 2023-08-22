import { IStorage } from '@/app/data/protocols/cache'
import { HttpClient, HttpRequestParams, HttpResponse } from '@/app/data/protocols/http'

export class AuthorizeHttpClientDecorator implements HttpClient {
	constructor(
		private readonly storage: IStorage,
		private readonly httpClient: HttpClient
	) {}

	async request(data: HttpRequestParams): Promise<HttpResponse> {
		const accountStorage = this.storage.get('account')
		const account = accountStorage ? JSON.parse(accountStorage) : null
		if (account?.accessToken) {
			Object.assign(data, {
				headers: Object.assign(data.headers || {}, {
					'x-access-token': account.accessToken
				})
			})
		}
		const httpResponse = await this.httpClient.request(data)
		return httpResponse
	}
}
