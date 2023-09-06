import { CountSale } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteCountSale implements CountSale {
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
