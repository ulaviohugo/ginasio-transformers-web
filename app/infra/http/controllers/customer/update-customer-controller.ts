import { UpdateCustomer } from '@/app/domain/usecases'
import { EmailInUseError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { CustomerModel } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

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
					dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					updatedById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)
			if (updatedCustomer == 'notFound') {
				return notFound()
			}
			if (updatedCustomer == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(updatedCustomer)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
