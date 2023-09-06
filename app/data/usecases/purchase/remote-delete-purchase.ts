import { DeletePurchase } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteDeletePurchase implements DeletePurchase {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}
	async delete(id: number): Promise<boolean> {
		const httpResponse = await this.httpClient.request({
			method: 'delete',
			url: `${this.url}/${id}`
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
