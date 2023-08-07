import { Employee } from '@/app/domain/models'
import { AddEmployee } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { ObjectUtils } from '@/app/utils'

export class RemoteAddEmployee implements AddEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}
	async add(param: Employee): Promise<Employee> {
		const body = ObjectUtils.removeProps<Employee>(param, [
			'createdAt',
			'createdBy',
			'updatedAt',
			'updatedBy',
			'id'
		])
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
