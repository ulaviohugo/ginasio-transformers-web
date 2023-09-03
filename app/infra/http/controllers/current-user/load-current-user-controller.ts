import { LoadCurrentUser } from '@/app/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller, ControllerParams } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'
import { NumberUtils } from '@/app/utils'

export class LoadCurrentUserController implements Controller {
	constructor(private readonly loadCurrentUser: LoadCurrentUser) {}
	async handle(param: ControllerParams): Promise<HttpResponse> {
		try {
			const accountId = NumberUtils.convertToNumber(param.accountId)
			const data = await this.loadCurrentUser.load(accountId)
			return ok(data)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
