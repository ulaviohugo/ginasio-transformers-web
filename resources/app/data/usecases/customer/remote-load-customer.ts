import {
	LoadCustomers,
	LoadCustomersParams,
	LoadCustomersResult
} from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { ObjectUtils } from '@/utils'

export class RemoteLoadCustomers implements LoadCustomers {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async load(params?: LoadCustomersParams): Promise<LoadCustomersResult> {
		const url = params ? ObjectUtils.toQueryParams(params, this.url) : this.url
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
