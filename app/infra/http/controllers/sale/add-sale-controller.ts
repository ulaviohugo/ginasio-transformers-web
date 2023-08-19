import { AddSale } from '@/app/domain/usecases'
import { badRequest, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Sale } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class AddSaleController implements Controller {
	constructor(
		private readonly addSale: AddSale,
		private readonly validation: Validation
	) {}
	async handle(request: Sale): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const createdSale = await this.addSale.add({
				...request,
				purchaseId: NumberUtils.convertToNumber(request.purchaseId),
				quantity: NumberUtils.convertToNumber(request.quantity),
				employeeId: NumberUtils.convertToNumber(request.employeeId, true) || 1,
				totalValue: NumberUtils.convertToNumber(request.totalValue),
				unitPrice: NumberUtils.convertToNumber(request.unitPrice),
				discount: NumberUtils.convertToNumber(request.discount)
			})
			return ok(createdSale)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
