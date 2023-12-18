import { EmployeeModel } from '@/domain/models'
import { UpdateEmployee } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { NumberUtils, ObjectUtils } from '@/utils'

export class RemoteUpdateEmployee implements UpdateEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: EmployeeModel): Promise<EmployeeModel> {
		const handledParam = ObjectUtils.removeProps<EmployeeModel>(
			{
				...param,
				base_salary: NumberUtils.convertToPrice(param.base_salary),
				meal_allowance: NumberUtils.convertToPrice(param.meal_allowance),
				productivity_allowance: NumberUtils.convertToPrice(param.productivity_allowance),
				transportation_allowance: NumberUtils.convertToPrice(
					param.transportation_allowance
				),
				family_allowance: NumberUtils.convertToPrice(param.family_allowance)
			},
			['created_at', 'user_id', 'updated_at', 'user_id_update']
		)

		const httpResponse = await this.httpClient.request({
			method: 'put',
			url: `${this.url}/${param.id}`,
			body: handledParam
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
