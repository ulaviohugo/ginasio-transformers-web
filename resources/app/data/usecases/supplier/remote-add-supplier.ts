import { SupplierModel } from '@/domain/models'
import { AddSupplier } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteAddSupplier implements AddSupplier {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: SupplierModel): Promise<SupplierModel> {
		const httpResponse = await this.httpClient.request({
			method: 'post',
			url: this.url,
			body: param
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
