import { DeleteEmployee } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'

export class RemoteDeleteEmployee implements DeleteEmployee {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}
	async delete(employeeId: number): Promise<boolean> {
		const httpResponse = await this.httpClient.request({
			method: 'delete',
			url: `${this.url}/${employeeId}`
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
