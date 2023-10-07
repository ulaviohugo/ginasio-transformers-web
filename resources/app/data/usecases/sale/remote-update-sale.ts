import { SaleModel } from '@/domain/models'
import { UpdateSale } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateSale implements UpdateSale {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: SaleModel): Promise<SaleModel> {
		const unit_price = NumberUtils.convertToNumber(param.unit_price)
		const total_value = NumberUtils.convertToNumber(param.total_value)
		const purchaseId = NumberUtils.convertToNumber(param.purchaseId)
		const handledParam = ObjectUtils.removeProps<SaleModel>(
			{ ...param, unit_price, total_value, purchaseId },
			['created_at', 'user_id', 'updated_at', 'user_id_update']
		)
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
