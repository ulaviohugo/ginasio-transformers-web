import { SaleModel } from '@/domain/models'
import { AddSale } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteAddSale implements AddSale {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: SaleModel): Promise<SaleModel> {
		// const body = FormDataUtils.createFormData({
		// 	...param,
		// 	total_value,
		// })
		const body = JSON.stringify(param)
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
