import { Employee } from '@/app/domain/models'
import { UpdateEmployee } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { ObjectUtils } from '@/app/utils'

export class RemoteUpdateEmployee implements UpdateEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Employee): Promise<Employee> {
		const handledParam = ObjectUtils.removeProps<Employee>(param, [
			'createdAt',
			'createdBy',
			'updatedAt',
			'updatedBy'
		])

		const values = Object.values(handledParam)
		const keys = Object.keys(handledParam)

		const body = new FormData()
		for (let i = 0; i < values.length; i++) {
			const key = keys[i]
			const value = values[i]
			body.append(key, value)
		}
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
