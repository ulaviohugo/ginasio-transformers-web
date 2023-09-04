import { NotificationModel } from '@/app/domain/models'
import { UpdateNotification } from '@/app/domain/usecases'
import { HttpClient, HttpStatusCode } from '../../protocols/http'
import { UnexpectedError } from '@/app/infra/http/errors'
import { FormDataUtils, ObjectUtils } from '@/app/utils'

export class RemoteUpdateNotification implements UpdateNotification {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient
	) {}

	async update(param: NotificationModel): Promise<NotificationModel> {
		const handledParam = ObjectUtils.removeProps<NotificationModel>(param, [
			'createdAt',
			'updatedAt',
			'updatedById'
		])
		const body = FormDataUtils.createFormData(handledParam)

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
