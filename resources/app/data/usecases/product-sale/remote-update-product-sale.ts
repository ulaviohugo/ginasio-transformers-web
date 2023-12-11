import { ProductSaleModel } from '@/domain/models'
import { UpdateProductSale } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { NumberUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateProductSale implements UpdateProductSale {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: ProductSaleModel): Promise<ProductSaleModel> {
		const unit_price = NumberUtils.convertToNumber(param.unit_price)
		const total_value = NumberUtils.convertToNumber(param.total_value)
		const handledParam = ObjectUtils.removeProps<ProductSaleModel>(
			{ ...param, unit_price, total_value },
			['created_at', 'user_id', 'updated_at', 'user_id_update']
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
