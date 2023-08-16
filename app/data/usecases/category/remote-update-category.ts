import { Category } from '@/app/domain/models'
import { UpdateCategory } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/app/utils'

export class RemoteUpdateCategory implements UpdateCategory {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Category): Promise<Category> {
		const handledParam = ObjectUtils.removeProps<Category>(param, [
			'createdAt',
			'createdBy',
			'updatedAt',
			'updatedBy'
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
