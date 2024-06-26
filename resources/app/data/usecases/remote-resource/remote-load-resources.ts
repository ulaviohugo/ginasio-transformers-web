import { QueryParams } from '@/data/protocols'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/infra/http/errors'
import { ObjectUtils } from '@/utils'

export class RemoteLoadResource<T extends object = any, R = any> {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<T, R>
	) {}

	async load(params?: QueryParams<T>): Promise<R> {
		const url = params ? ObjectUtils.toQueryParams(params, this.url) : this.url
		const httpResponse = await this.httpClient.request({
			method: 'get',
			url
		})
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body as any
			default:
				throw new UnexpectedError(httpResponse.body as string)
		}
	}
}
