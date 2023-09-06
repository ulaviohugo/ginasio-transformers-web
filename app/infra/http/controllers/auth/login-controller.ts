import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { badRequest, ok, serverError, unauthorized } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class AuthenticationController implements Controller {
	constructor(
		private readonly authentication: Authentication,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<AuthenticationParams>): Promise<HttpResponse> {
		const error = this.validation.validate(request)
		if (error) {
			return badRequest(error)
		}
		try {
			const account = await this.authentication.auth(request)
			if (account == 'canNotLogin') {
				return unauthorized(' O seu acesso está bloqueado, consulte um administrador')
			}
			if (!account || account == 'invalidCredential') {
				return unauthorized('Credenciais inválidas')
			}

			return ok(account)
		} catch (error: any) {
			return serverError(dbErrorHandler(error))
		}
	}
}
