import { Supplier } from '@/app/domain/models'
import { UpdateSupplier } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/app/utils'

export class RemoteUpdateSupplier implements UpdateSupplier {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Supplier): Promise<Supplier> {
		const handledParam = ObjectUtils.removeProps<Supplier>(param, [
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