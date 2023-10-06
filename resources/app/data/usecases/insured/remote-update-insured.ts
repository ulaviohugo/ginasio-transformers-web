import { InsuredModel } from '@/domain/models'
import { UpdateInsured } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateInsured implements UpdateInsured {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: InsuredModel): Promise<InsuredModel> {
		const handledParam = ObjectUtils.removeProps<InsuredModel>(param, [
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
