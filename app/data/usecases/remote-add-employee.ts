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
		const values = Object.values(param)
		const keys = Object.keys(param)

		const body = new FormData()
		for (let i = 0; i < values.length; i++) {
			const key = keys[i]
			const value = values[i]
			body.append(key, value)
		}
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
