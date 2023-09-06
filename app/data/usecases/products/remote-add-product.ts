import { ProductModel } from '@/domain/models'
import { AddProduct } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils } from '@/utils'

export class RemoteAddProduct implements AddProduct {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: ProductModel): Promise<ProductModel> {
		const body = FormDataUtils.createFormData(param)
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
