import { ProductModel } from '@/domain/models'
import { UpdateProduct } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { NumberUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateProduct implements UpdateProduct {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: ProductModel): Promise<ProductModel> {
		const handledParam = ObjectUtils.removeProps<ProductModel>(
			{
				...param,
				purchase_price: NumberUtils.convertToNumber(param.purchase_price),
				selling_price: NumberUtils.convertToNumber(param.selling_price)
			},
			['created_at', 'user_id', 'updated_at', 'user_id_update', 'category']
		)

		const httpResponse = await this.httpClient.request({
			method: 'put',
			url: `${this.url}/${param.id}`,
			body: handledParam
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
