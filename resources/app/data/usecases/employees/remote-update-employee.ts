import { EmployeeModel } from '@/domain/models'
import { UpdateEmployee } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateEmployee implements UpdateEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: EmployeeModel): Promise<EmployeeModel> {
		const handledParam = ObjectUtils.removeProps<EmployeeModel>(param, [
			'created_at',
			'user_id',
			'updated_at',
			'user_id_update'
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
