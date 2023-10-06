import { InsuredModel } from '@/domain/models'
import { AddInsured } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils } from '@/utils'

export class RemoteAddInsured implements AddInsured {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: InsuredModel): Promise<InsuredModel> {
		// const body = FormDataUtils.createFormData(param)
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
