import { UpdateInsured } from '@/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { InsuredModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class UpdateInsuredController implements Controller {
	constructor(
		private readonly UpdateInsured: UpdateInsured,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<InsuredModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const updatedInsured = await this.UpdateInsured.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				date_of_birth: DateUtils.convertToDate(request.date_of_birth),
				province_id: NumberUtils.convertToNumber(request.province_id, true),
				municipality_id: NumberUtils.convertToNumber(request.municipality_id, true),
				dependents: NumberUtils.convertToNumber(request.dependents),
				enrollment_date: DateUtils.convertToDate(request.enrollment_date),
				renewal_date: DateUtils.convertToDate(request.renewal_date),
				documentIssueDate: DateUtils.convertToDate(request.documentIssueDate),
				user_id: NumberUtils.convertToNumber(request.accountId),
				user_id_update: NumberUtils.convertToNumber(request.accountId)
			})
			if (updatedInsured == 'notFound') {
				return notFound()
			}
			if (updatedInsured == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			if (updatedInsured == 'documentInUse') {
				return forbidden(new DocumentInUseError())
			}
			return ok(updatedInsured)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
