import { Purchase } from '@/app/domain/models'
import { UpdatePurchase } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, NumberUtils, ObjectUtils } from '@/app/utils'

export class RemoteUpdatePurchase implements UpdatePurchase {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Purchase): Promise<Purchase> {
		const unitPrice = NumberUtils.convertToNumber(param.unitPrice)
		const totalValue = NumberUtils.convertToNumber(param.totalValue)
		const sellingPriceUnit = NumberUtils.convertToNumber(param.sellingPriceUnit)
		const handledParam = ObjectUtils.removeProps<Purchase>(
			{ ...param, unitPrice, totalValue, sellingPriceUnit },
			['createdAt', 'createdBy', 'updatedAt', 'updatedBy']
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
