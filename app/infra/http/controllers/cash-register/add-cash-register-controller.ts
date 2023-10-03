import { AddCashRegister, LoadCashRegister, UpdateCashRegister } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { CashRegisterModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class AddCashRegisterController implements Controller {
	constructor(
		private readonly addCashRegister: AddCashRegister,
		private readonly validation: Validation,
		private readonly loadCashRegister: LoadCashRegister,
		private readonly updateCashRegister: UpdateCashRegister
	) {}
	async handle(request: ControllerParams<CashRegisterModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const cacheRegister = await this.loadCashRegister.load()

			if (cacheRegister?.id) {
				const updatedCashRegister = await this.updateCashRegister.update({
					...request,
					id: cacheRegister.id,
					updatedById: request.accountId,
					updatedAt: new Date()
				})
				return ok(updatedCashRegister)
			}

			const createdCashRegister = await this.addCashRegister.add({
				...request,
				createdById: NumberUtils.convertToNumber(request.accountId)
			})
			return ok(createdCashRegister)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
