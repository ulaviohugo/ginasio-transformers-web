import { LoadFabrics } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { FabricModel } from '@/domain/models'

export class RemoteLoadFabrics implements LoadFabrics {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async load(): Promise<FabricModel[]> {
		const httpResponse = await this.httpClient.request({
			method: 'get',
			url: this.url
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body || []
			default:
				throw new UnexpectedError(httpResponse.body as any)
		}
	}
}
