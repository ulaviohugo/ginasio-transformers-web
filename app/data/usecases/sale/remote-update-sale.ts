import { Sale } from '@/app/domain/models'
import { UpdateSale } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, NumberUtils, ObjectUtils } from '@/app/utils'

export class RemoteUpdateSale implements UpdateSale {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Sale): Promise<Sale> {
		const unitPrice = NumberUtils.convertToNumber(param.unitPrice)
		const totalValue = NumberUtils.convertToNumber(param.totalValue)
		const purchaseId = NumberUtils.convertToNumber(param.purchaseId)
		const handledParam = ObjectUtils.removeProps<Sale>(
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
