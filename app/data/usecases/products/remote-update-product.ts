import { Product } from '@/app/domain/models'
import { UpdateProduct } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { ObjectUtils } from '@/app/utils'

export class RemoteUpdateProduct implements UpdateProduct {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: Product): Promise<Product> {
		const handledParam = ObjectUtils.removeProps<Product>(param, [
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
