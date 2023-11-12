import {
	LoadSuppliers,
	LoadSuppliersParams,
	LoadSuppliersResult
} from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { ObjectUtils } from '@/utils'

export class RemoteLoadSuppliers implements LoadSuppliers {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async load(params?: LoadSuppliersParams): Promise<LoadSuppliersResult> {
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
