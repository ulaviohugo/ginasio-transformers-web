import { SupplierModel } from '@/app/domain/models'
import { AddSupplier } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/app/utils'

export class RemoteAddSupplier implements AddSupplier {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: SupplierModel): Promise<SupplierModel> {
		const body = FormDataUtils.createFormData({ ...param })
		const httpResponse = await this.httpClient.request({
			method: 'post',
			url: this.url,
			body
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
