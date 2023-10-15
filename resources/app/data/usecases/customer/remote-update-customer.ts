import { CustomerModel } from '@/domain/models'
import { UpdateCustomer } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { ObjectUtils } from '@/utils'

export class RemoteUpdateCustomer implements UpdateCustomer {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: CustomerModel): Promise<CustomerModel> {
		const handledParam = ObjectUtils.removeProps<CustomerModel>(param, [
			'created_at',
			'user_id',
			'updated_at',
			'user_id_update'
		])

		const httpResponse = await this.httpClient.request({
			method: 'put',
			url: `${this.url}/${param.id}`,
			body: handledParam
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
