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
		const unitPrice = NumberUtils.convertToNumber(param.unitPrice)
		const totalValue = NumberUtils.convertToNumber(param.totalValue)
		const sellingPriceUnit = NumberUtils.convertToNumber(param.sellingPriceUnit)

		const body = FormDataUtils.createFormData({
			...param,
			unitPrice,
			totalValue,
			sellingPriceUnit
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
