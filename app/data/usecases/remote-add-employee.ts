import { Employee } from '@/app/domain/models'
import { AddEmployee } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'

export class RemoteAddEmployee implements AddEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: Employee): Promise<Employee> {
		const httpResponse = await this.httpClient.request({
			method: 'post',
			url: this.url,
			body: param
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
