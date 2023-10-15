import { LoadTransactions } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { TransactionModel } from '@/domain/models'
import { QueryParams } from '@/data/protocols'

export class RemoteLoadTransactions implements LoadTransactions {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async load(queryParams?: QueryParams<TransactionModel>): Promise<TransactionModel[]> {
		const httpResponse = await this.httpClient.request({
			method: 'get',
			url: this.url,
			params: queryParams
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body as any)
		}
	}
}
