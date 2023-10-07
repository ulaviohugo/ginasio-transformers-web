import { AddEmployee } from '@/domain/usecases'
import { DocumentInUseError, EmailInUseError } from '@/infra/http/errors'
import { badRequest, forbidden, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { EmployeeModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { UploadService } from '@/services'
import { HttpResponse } from '@/data/protocols/http'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'
import { EmployeeViewModel } from '@/infra/http/view-models'

export class AddEmployeeController implements Controller {
	constructor(
		private readonly addEmployee: AddEmployee,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<EmployeeModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const can_login = request.can_login === true || (request as any).can_login == 'true'
			if (can_login && !request.role) return badRequest(new Error('Informe o perfil'))
			if (can_login && !request.password) return badRequest(new Error('Informe a senha'))

			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/employees')
			}
			const createdEmployee = await this.addEmployee.add(
				{
					...request,
					date_of_birth: DateUtils.convertToDate(request.date_of_birth),
					country_id: NumberUtils.convertToNumber(request.country_id),
					province_id: NumberUtils.convertToNumber(request.province_id, true),
					municipality_id: NumberUtils.convertToNumber(request.municipality_id, true),
					dependents: NumberUtils.convertToNumber(request.dependents),
					base_salary: NumberUtils.convertToNumber(request.base_salary),
					can_login,
					hire_date: DateUtils.convertToDate(request.hire_date),
					contract_end_date: DateUtils.convertToDate(request.contract_end_date),
					user_id: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)

			if (createdEmployee == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			if (createdEmployee == 'documentInUse') {
				return forbidden(new DocumentInUseError())
			}
			return ok(EmployeeViewModel.toHTTP(createdEmployee))
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
