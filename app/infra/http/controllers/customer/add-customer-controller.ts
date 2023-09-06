import { AddCustomer } from '@/domain/usecases'
import { EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { CustomerModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { UploadService } from '@/services'
import { HttpResponse } from '@/data/protocols/http'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class AddCustomerController implements Controller {
	constructor(
		private readonly addCustomer: AddCustomer,
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
			const createdCustomer = await this.addCustomer.add(
				{
					...request,
					dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					createdById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)

			if (createdCustomer == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(createdCustomer)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
