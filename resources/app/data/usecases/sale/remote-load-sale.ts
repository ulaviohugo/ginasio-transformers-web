import { LoadSales, LoadSalesResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { QueryParams } from '@/data/protocols'
import { SaleModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class RemoteLoadSale implements LoadSales {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async load(queryParams?: QueryParams<SaleModel>): Promise<LoadSalesResult> {
		const url = queryParams ? ObjectUtils.toQueryParams(queryParams, this.url) : this.url

		const httpResponse = await this.httpClient.request({
			method: 'get',
			url
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body as any)
		}
	}
}
