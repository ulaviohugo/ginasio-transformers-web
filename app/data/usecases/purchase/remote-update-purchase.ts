import { PurchaseModel } from '@/domain/models'
import { UpdatePurchase } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils, ObjectUtils } from '@/utils'

export class RemoteUpdatePurchase implements UpdatePurchase {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: PurchaseModel): Promise<PurchaseModel> {
		const unitPrice = NumberUtils.convertToNumber(param.unitPrice)
		const totalValue = NumberUtils.convertToNumber(param.totalValue)
		const sellingPriceUnit = NumberUtils.convertToNumber(param.sellingPriceUnit)
		const handledParam = ObjectUtils.removeProps<PurchaseModel>(
			{ ...param, unitPrice, totalValue, sellingPriceUnit },
			['createdAt', 'createdById', 'updatedAt', 'updatedById', 'employeeId']
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
