import { AddInsured } from '@/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { InsuredModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class AddInsuredController implements Controller {
	constructor(
		private readonly addInsured: AddInsured,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<InsuredModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const createdInsured = await this.addInsured.add({
				...request,
				dateOfBirth: DateUtils.convertToDate(request.dateOfBirth),
				provinceId: NumberUtils.convertToNumber(request.provinceId, true),
				municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
				dependents: NumberUtils.convertToNumber(request.dependents),
				enrollmentDate: DateUtils.convertToDate(request.enrollmentDate),
				renewalDate: DateUtils.convertToDate(request.renewalDate),
				documentIssueDate: DateUtils.convertToDate(request.documentIssueDate),
				createdById: NumberUtils.convertToNumber(request.accountId)
			})

			if (createdInsured == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			if (createdInsured == 'documentInUse') {
				return forbidden(new DocumentInUseError())
			}
			return ok(createdInsured)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
