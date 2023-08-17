import { DeleteSupplier } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'

export class RemoteDeleteSupplier implements DeleteSupplier {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}
	async delete(supplierId: number): Promise<boolean> {
		const httpResponse = await this.httpClient.request({
			method: 'delete',
			url: `${this.url}/${supplierId}`
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body)
		}
	}
}
