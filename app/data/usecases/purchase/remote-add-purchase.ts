import { Purchase } from '@/app/domain/models'
import { AddPurchase } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/app/utils'

export class RemoteAddPurchase implements AddPurchase {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: Purchase): Promise<Purchase> {
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
