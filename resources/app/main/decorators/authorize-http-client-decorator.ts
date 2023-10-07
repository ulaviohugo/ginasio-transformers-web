import { IStorage } from '@/data/protocols/cache'
import { HttpClient, HttpRequestParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpClientDecorator implements HttpClient {
	constructor(
		private readonly storage: IStorage,
		private readonly httpClient: HttpClient
	) {}

	async request(data: HttpRequestParams): Promise<HttpResponse> {
		const accountStorage = this.storage.get('account')
		const account = accountStorage ? JSON.parse(accountStorage) : null
		if (account?.access_token) {
			Object.assign(data, {
				headers: Object.assign(data?.headers || {}, {
					Authorization: `bearer ${account.access_token}`
				})
			})
		}
		const httpResponse = await this.httpClient.request(data)
		return httpResponse
	}
}
