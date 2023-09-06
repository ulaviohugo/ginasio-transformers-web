import { CountProduct } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteCountProduct implements CountProduct {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async count(): Promise<number> {
		const httpResponse = await this.httpClient.request({
			method: 'get',
			url: this.url
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body as any)
		}
	}
}
