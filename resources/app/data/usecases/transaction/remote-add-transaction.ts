import { TransactionModel } from '@/domain/models'
import { AddTransaction } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/utils'

export class RemoteAddTransaction implements AddTransaction {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: TransactionModel): Promise<TransactionModel> {
		const body = FormDataUtils.createFormData({
			...param,
			amount: NumberUtils.convertToNumber(param.amount)
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
