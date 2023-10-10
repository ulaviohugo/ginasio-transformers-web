import { EmployeeModel } from '@/domain/models'
import { AddEmployee } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FormDataUtils, NumberUtils } from '@/utils'

export class RemoteAddEmployee implements AddEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async add(param: EmployeeModel): Promise<EmployeeModel> {
		const body = FormDataUtils.createFormData({
			...param,
			base_salary: NumberUtils.convertToPrice(param.base_salary)
		})
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
