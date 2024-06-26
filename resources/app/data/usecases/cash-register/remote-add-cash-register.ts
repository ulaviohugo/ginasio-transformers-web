import { CashRegisterModel } from '@/domain/models'
import { AddCashRegister } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/utils'

export class RemoteAddCashRegister implements AddCashRegister {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: CashRegisterModel): Promise<CashRegisterModel> {
		const body = FormDataUtils.createFormData({
			...param,
			initial_balance: NumberUtils.convertToNumber(param.initial_balance),
			balance: NumberUtils.convertToNumber(param.balance)
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
