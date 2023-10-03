import { TransactionModel } from '@/domain/models'
import { UpdateTransaction } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateTransaction implements UpdateTransaction {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: TransactionModel): Promise<TransactionModel> {
		const handledParam = ObjectUtils.removeProps<TransactionModel>(param, [
			'createdAt',
			'createdById',
			'updatedAt',
			'updatedById'
		])
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
