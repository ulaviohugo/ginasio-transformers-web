import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils } from '@/utils'
import { AccountModel } from '@/domain/models'

export class RemoteAuthentication implements Authentication {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async auth(param: AuthenticationParams): Promise<AccountModel> {
		const body = FormDataUtils.createFormData(param)
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
