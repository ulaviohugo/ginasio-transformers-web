import { SaleModel } from '@/app/domain/models'
import { AddSale } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/app/utils'

export class RemoteAddSale implements AddSale {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: SaleModel): Promise<SaleModel> {
		const unitPrice = NumberUtils.convertToNumber(param.unitPrice)
		const totalValue = NumberUtils.convertToNumber(param.totalValue)
		const purchaseId = NumberUtils.convertToNumber(param.purchaseId)

		const body = FormDataUtils.createFormData({
			...param,
			unitPrice,
			totalValue,
			purchaseId
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
