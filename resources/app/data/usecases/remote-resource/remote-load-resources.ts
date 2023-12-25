import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteLoadResource<T extends object = any, R = any> {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<T, R>
	) {}

	async load(): Promise<R> {
		const httpResponse = await this.httpClient.request({
			method: 'get',
			url: this.url
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body || (undefined as any)
			default:
				throw new UnexpectedError(httpResponse.body as string)
		}
	}
}
