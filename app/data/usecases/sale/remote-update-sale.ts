import { SaleModel } from '@/domain/models'
import { UpdateSale } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateSale implements UpdateSale {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: SaleModel): Promise<SaleModel> {
		const unitPrice = NumberUtils.convertToNumber(param.unitPrice)
		const totalValue = NumberUtils.convertToNumber(param.totalValue)
		const purchaseId = NumberUtils.convertToNumber(param.purchaseId)
		const handledParam = ObjectUtils.removeProps<SaleModel>(
			{ ...param, unitPrice, totalValue, purchaseId },
			['createdAt', 'createdById', 'updatedAt', 'updatedById']
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
