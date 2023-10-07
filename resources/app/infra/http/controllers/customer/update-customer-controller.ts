import { UpdateCustomer } from '@/domain/usecases'
import { EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { CustomerModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'
import { CustomerViewModel } from '@/infra/http/view-models'

export class UpdateCustomerController implements Controller {
	constructor(
		private readonly UpdateCustomer: UpdateCustomer,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<CustomerModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/customers')
			}
			const updatedCustomer = await this.UpdateCustomer.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					date_of_birth: DateUtils.convertToDate(request.date_of_birth),
					country_id: NumberUtils.convertToNumber(request.country_id),
					province_id: NumberUtils.convertToNumber(request.province_id, true),
					municipality_id: NumberUtils.convertToNumber(request.municipality_id, true),
					user_id_update: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)
			if (updatedCustomer == 'notFound') {
				return notFound()
			}
			if (updatedCustomer == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(CustomerViewModel.toHTTP(updatedCustomer))
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
