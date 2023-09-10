import { LoadCurrentUser } from '@/domain/usecases'
import { ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams } from '@/infra/http/protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { NumberUtils } from '@/utils'
import { EmployeeViewModel } from '@/infra/http/view-models'

export class LoadCurrentUserController implements Controller {
	constructor(private readonly loadCurrentUser: LoadCurrentUser) {}
	async handle(param: ControllerParams): Promise<HttpResponse> {
		try {
			const accountId = NumberUtils.convertToNumber(param.accountId)
			const data = await this.loadCurrentUser.load(accountId)
			return ok(EmployeeViewModel.toHTTP(data))
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
