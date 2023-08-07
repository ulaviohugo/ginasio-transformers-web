import { Employee } from '@/app/domain/models'
import { UpdateEmployee } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { ObjectUtils } from '@/app/utils'

export class RemoteUpdateEmployee implements UpdateEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Employee): Promise<Employee> {
		const body = ObjectUtils.removeProps<Employee>(param, [
			'createdAt',
			'createdBy',
			'updatedAt',
			'updatedBy'
		])
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
