import { PurchaseModel } from '@/domain/models'
import { AddPurchase } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/utils'

export class RemoteAddPurchase implements AddPurchase {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: PurchaseModel): Promise<PurchaseModel> {
		const unit_price = NumberUtils.convertToNumber(param.unit_price)
		const total_value = NumberUtils.convertToNumber(param.total_value)
		const selling_price_unit = NumberUtils.convertToNumber(param.selling_price_unit)

		const body = FormDataUtils.createFormData({
			...param,
			unit_price,
			total_value,
			selling_price_unit
		})
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
