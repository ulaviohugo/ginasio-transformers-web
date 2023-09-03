import { ProductModel } from '@/app/domain/models'
import { UpdateProduct } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/app/utils'

export class RemoteUpdateProduct implements UpdateProduct {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: ProductModel): Promise<ProductModel> {
		const handledParam = ObjectUtils.removeProps<ProductModel>(param, [
			'createdAt',
			'createdById',
			'updatedAt',
			'updatedById',
			'category'
		])
		const body = FormDataUtils.createFormData(handledParam)

		const httpResponse = await this.httpClient.request({
			method: 'put',
			url: `${this.url}/${param.id}`,
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
