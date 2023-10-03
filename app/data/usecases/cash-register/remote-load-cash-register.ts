import { LoadCashRegister } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { CashRegisterModel } from '@/domain/models'

export class RemoteLoadCashRegister implements LoadCashRegister {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async load(): Promise<CashRegisterModel> {
		const httpResponse = await this.httpClient.request({
			method: 'get',
			url: this.url
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body
			default:
				throw new UnexpectedError(httpResponse.body as any)
		}
	}
}
